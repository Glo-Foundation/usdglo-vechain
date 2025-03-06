import * as dotenv from "dotenv";
import hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const walletToRevokeRole = process.env.INITIAL_ADMIN_ADDRESS as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const upgrader_role = await token.UPGRADER_ROLE();

  console.log(walletToRevokeRole);

  console.log(upgrader_role);

  const has_role = await token.hasRole(upgrader_role, walletToRevokeRole);

  console.log("has upgrader role: ", has_role);

  const assignUpgraderRole = await token.revokeRole(upgrader_role, walletToRevokeRole);


  const now_has_role = await token.hasRole(upgrader_role, walletToRevokeRole);

  console.log("has upgrader role: ", now_has_role);

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
