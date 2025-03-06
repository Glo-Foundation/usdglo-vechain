import * as dotenv from "dotenv";
import hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const walletToGrantRole = process.env.BRALE_ADMIN_MAINNET as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const minter_role = await token.MINTER_ROLE();

  console.log(walletToGrantRole);
  console.log(minter_role);

  const has_role = await token.hasRole(minter_role, walletToGrantRole);

  console.log("has minter role: ", has_role);

  const assignUpgraderRole = await token.grantRole(minter_role, walletToGrantRole);


  const now_has_role = await token.hasRole(minter_role, walletToGrantRole);

  console.log("has minter role: ", now_has_role);

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
