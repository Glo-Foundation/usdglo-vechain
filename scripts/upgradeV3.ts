import * as dotenv from "dotenv";
import * as hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const upgradeContractName = process.env.UPGRADEV3_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const initialAdminAddress = process.env.INITIAL_ADMIN_ADDRESS as string;

  const [deployerSigner] = await hre.ethers.getSigners();

  const UpgradedUSDGlobalIncomeCoin = await hre.ethers.getContractFactory(
    upgradeContractName,
    deployerSigner
  );
  console.log("deploying Glo token v3");
  const upgradedGloToken = await UpgradedUSDGlobalIncomeCoin.deploy();
  const tx = await upgradedGloToken.deploymentTransaction();
  const receipt = await hre.ethers.provider.getTransactionReceipt(tx!.hash);
  console.log(`Glo v3 deployed to ${receipt?.contractAddress}`);

  const proxy = await hre.ethers.getContractAt(UUPSUpgradeable.abi, proxyAddress)
  await proxy.upgradeToAndCall(receipt.contractAddress, "0x38e454b100000000000000000000000000000000000000000000000000000000")
  console.log("Proxy upgraded to v3:", receipt.contractAddress)
}

if (require.main === module) {
  dotenv.config();
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
