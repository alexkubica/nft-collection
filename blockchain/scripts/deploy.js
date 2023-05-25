const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const {  METADATA_URL } = require("../constants");

async function main() {
  // whitelist contract
  const whitelistContract = await ethers.getContractFactory("Whitelist");

  // deploy the contract
  const deployedWhitelistContract = await whitelistContract.deploy(
    20,
  );

  // Wait for it to finish deploying
  await deployedWhitelistContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Whitelist Contract Address:",
    deployedWhitelistContract.address
  );

  // URL from where we can extract the metadata for a Crypto Dev NFT
  const metadataURL = METADATA_URL;

  const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

  // deploy the contract
  const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
    metadataURL,
    whitelistContract
  );

  // Wait for it to finish deploying
  await deployedCryptoDevsContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Crypto Devs Contract Address:",
    deployedCryptoDevsContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });