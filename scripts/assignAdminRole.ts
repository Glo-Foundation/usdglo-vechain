import * as dotenv from "dotenv";
import hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const initialAdminAddress = process.env.INITIAL_ADMIN_ADDRESS as string;
  const walletToGrantRole = process.env.LEDGER_ADMIN_MAINNET as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const admin_role = await token.DEFAULT_ADMIN_ROLE();

  console.log(admin_role);

  const has_role = await token.hasRole(admin_role, walletToGrantRole);

  console.log("has admin role: ", has_role);

  const assignUpgraderRole = await token.grantRole(admin_role, walletToGrantRole);


  const now_has_role = await token.hasRole(admin_role, walletToGrantRole);

  console.log("has admin role: ", now_has_role);

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
