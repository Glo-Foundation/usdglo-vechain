import * as dotenv from "dotenv";
import hre from "hardhat";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const currentContractName = process.env.UPGRADE_CONTRACT_NAME as string;
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const initialAdminAddress = process.env.INITIAL_ADMIN_ADDRESS as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const denylister_role = await token.DENYLISTER_ROLE();

  console.log(denylister_role);

  const has_role = await token.hasRole(denylister_role, initialAdminAddress);

  console.log("has denylister role: ", has_role);

  const assigndenylisterRole = await token.grantRole(denylister_role, initialAdminAddress);


  const now_has_role = await token.hasRole(denylister_role, initialAdminAddress);

  console.log("now has denylister role: ", now_has_role);


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
