const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("trippin");

  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);

  const preBalance = await hre.ethers.provider.getBalance(
    domainContract.address
  );

  console.log(
    "Contract balance pre txn:",
    hre.ethers.utils.formatEther(preBalance)
  );

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
  let price = await domainContract.price("webe");
  let txn = await domainContract.register("webe", {
    value: hre.ethers.utils.parseEther(
      (parseInt(price, 10) / 10 ** 18).toString()
    ),
  });
  await txn.wait();

  console.log("Minted domain webe.trippin");
  txn = await domainContract.setRecord("webe", "Who trippin?");
  await txn.wait();

  console.log("Set record for webe.trippin");
  const address = await domainContract.getAddress("webe");

  console.log("Owner of domain webe:", address);
  const balance = await hre.ethers.provider.getBalance(domainContract.address);

  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
