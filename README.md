This project demonstrates a setup for smart-contract development with hardhat and react.js

# Hardhat & react blockchain template

## Usage

Clone this repo:
```
git clone git@github.com:teonite/blockchain-template.git
```

Install hardhat & frontend dependencies:
```
yarn install && pushd frontend && yarn install && popd
```

Prepare .env file:
```
cp .env.example .env
```
and fill in your variables.

### Local development
For local development we'll use a hardhat node. Run it with:
```
yarn run node
```

Then we need to deploy the contract: 
```
yarn deploy:local
```
Your node logs should display info about the deployment.

Once the contract is deployed you can run vite dev server and start hacking on your app:
```
yarn dev
```

Run contract tests with:
```
yarn test:contracts
```

More info:
* https://hardhat.org/getting-started/
* https://vitejs.dev/guide/

### Deployments
Once the network is configured in hardhat.config.ts, you can deploy contracts with
```
yarn hardhat run --network <YOUR_NETWORK> scripts/deploy.ts
```
To upgrade a contract using OpenZeppelin Defender and Gnosis Safe wallet run:
```
yarn hardhat run --network <YOUR_NETWORK> scripts/propose-upgrade.ts
```
For multisig deployments it's recommended to deploy to Rinkeby network since Gnosis Safe does not support Ropsten.
## Used libs & tech
* https://hardhat.org/ - Ethereum development environment
* https://vitejs.dev/ - alternative to create react app
* https://defender.openzeppelin.com/ - security operations platform for Ethereum
* https://gnosis-safe.io/ - multisignature wallet platform
* https://github.com/dethcrypto/TypeChain - TypeScript bindings for Ethereum smart contracts
* https://github.com/ethers-io/ethers.js/ - Ethereum wallet implementation in JS/TS
* https://github.com/protofire/solhint - Solidity code linter

## TODOs & issues
* no hot reloading for contract, could possibly be resolved with https://github.com/symfoni/symfoni-monorepo, but the library seems abandoned (https://github.com/symfoni/hardhat-react-boilerplate/pull/10)
* CI contract upgrades don't work - to make it work we'll have to commit .openzeppelin directory to git from gh job.
