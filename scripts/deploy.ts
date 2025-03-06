import * as dotenv from "dotenv";
import hre from "hardhat";
import * as ERC1967Proxy from '@openzeppelin/contracts/build/contracts/ERC1967Proxy';
import * as Web3EthAbi from "web3-eth-abi";

async function main() {
    // adjust "MyToken" to be your contracts name
    const [deployerSigner] = await hre.ethers.getSigners();
    const initialAdminAddress = deployerSigner.address as string;

    const USDGlobalIncomeCoin = await hre.ethers.getContractFactory(
        "USDGlobalIncomeCoin",
        deployerSigner
      );

    const myToken = await USDGlobalIncomeCoin.deploy();
    const tx = await myToken.deploymentTransaction();
    const receipt = await hre.ethers.provider.getTransactionReceipt(tx!.hash);
    console.log(`Glo 1.0 deployed to ${receipt?.contractAddress}`);

    const { abi } = await hre.artifacts.readArtifact("USDGlobalIncomeCoin");
    const callInitialize = Web3EthAbi.encodeFunctionCall(
      abi.find(({ name }) => name === 'initialize'), [initialAdminAddress]
    );

    const Proxy = await hre.ethers.getContractFactory(ERC1967Proxy.abi, ERC1967Proxy.bytecode);

    const usdGlobalIncomeCoin = await Proxy.deploy(receipt?.contractAddress, callInitialize);

    const proxyTx = await usdGlobalIncomeCoin.deploymentTransaction();
    const proxyReceipt = await hre.ethers.provider.getTransactionReceipt(proxyTx!.hash);
    console.log(`USDGlobalIncomeCoin Proxy: ${proxyReceipt?.contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })