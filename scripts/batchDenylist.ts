import * as dotenv from "dotenv";
import hre from "hardhat";
import { readFileSync } from "fs";
import * as UUPSUpgradeable from '@openzeppelin/contracts/build/contracts/UUPSUpgradeable.json';

async function main() {
  const denylistFile = "data/usdcDenylisted2025jan14.csv" as string;
  const denylistAddresses = readFileSync(denylistFile, "utf-8").split("\n");

  const proxyAddress = process.env.PROXY_ADDRESS as string;
  const initialAdminAddress = process.env.INITIAL_ADMIN_ADDRESS as string;

  const Token = await hre.ethers.getContractFactory("USDGlobalIncomeCoin");
  const token = await Token.attach(proxyAddress);

  const denylister_role = await token.DENYLISTER_ROLE();

  const has_role = await token.hasRole(denylister_role, initialAdminAddress);

  console.log("has denylister role: ", has_role)


  for (const addr of denylistAddresses) {
    console.log("denylisting address: ", addr);
    const denylist = await token.denylist(addr);
    
  }
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
