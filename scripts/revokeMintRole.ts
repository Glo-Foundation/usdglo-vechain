import * as dotenv from "dotenv";
import hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const walletToRevokeRole = process.env.INITIAL_ADMIN_ADDRESS as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const minter_role = await token.MINTER_ROLE();

  console.log(walletToRevokeRole);

  console.log(minter_role);

  const has_role = await token.hasRole(minter_role, walletToRevokeRole);

  console.log("has minter role: ", has_role);

  const revokeMinterRole = await token.revokeRole(minter_role, walletToRevokeRole);


  const now_has_role = await token.hasRole(minter_role, walletToRevokeRole);

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
