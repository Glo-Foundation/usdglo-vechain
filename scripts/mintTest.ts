import * as dotenv from "dotenv";
import * as hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const initialAdminAddress = process.env.INITIAL_ADMIN_ADDRESS as string;

  const Token = await hre.ethers.getContractFactory("GloDollarV3");
  const token = await Token.attach(proxyAddress);

  const recipient = "0x3B53F4eAC117268Cf77d4ecD602fEF880FEDeAD9";
  const amountToMint = 10000000000000000000n;

  console.log("proper amount to mint: ", amountToMint);

  const amountToTry = 10n * (10n ** 18n);

  console.log("amoount to try: ", amountToTry);

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



