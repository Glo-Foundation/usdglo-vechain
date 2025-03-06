# Deploying Glo Dollar to VeChain

Deploy v1:
`npx hardhat run scripts/deploy.ts --network vechain_mainnet`

Populate proxy address in `.env`

Grant upgrade role to the deployer wallet:
`npx hardhat run scripts/assignUpgradeRole.ts --network vechain_testnet`

Upgrade to version 2, and then to version 3:
`npx hardhat run scripts/upgradeV2.ts --network vechain_testnet`
`npx hardhat run scripts/upgradeV3.ts --network vechain_testnet`

To verify upgrades completed:
`npx hardhat run scripts/getProxyImplementationAddress.ts --network vechain_testnet`


Assign all other roles

`npx hardhat run scripts/assignMintRole.ts --network vechain_testnet`
`npx hardhat run scripts/assignAdminRole.ts --network vechain_testnet`

Revoke old roles from the deployer multisig


Do a test mint with the new roles

`npx hardhat run scripts/mint.ts --network vechain_testnet`