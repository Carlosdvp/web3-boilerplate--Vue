# L2-zksync - Project Backend


## zkSync Hardhat project

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

## Project structure

- `/contracts`: smart contracts.
- `/deploy`: deployment and contract interaction scripts.
- `/test`: test files
- `hardhat.config.ts`: configuration file.

## Commands

- `yarn hardhat compile` will compile the contracts.
- `yarn run deploy` will execute the deployment script `/deploy/deploy-greeter.ts`. Requires [environment variable setup](#environment-variables).
- `yarn run greet` will execute the script `/deploy/use-greeter.ts` which interacts with the Greeter contract deployed.
- `yarn test`: run tests. **Check test requirements below.**

Both `yarn run deploy` and `yarn run greet` are configured in the `package.json` file and run `yarn hardhat deploy-zksync`.

### Environment variables

In order to prevent users to leak private keys, this project includes the `dotenv` package which is used to load environment variables. It's used to load the wallet private key, required to run the deploy script.

To use it, rename `.env.example` to `.env` and enter your private key.

```
WALLET_PRIVATE_KEY=123cde574ccff....
```

### Local testing

In order to run test, you need to start the zkSync local environment. Please check [this section of the docs](https://v2-docs.zksync.io/api/hardhat/testing.html#prerequisites) which contains all the details.

If you do not start the zkSync local environment, the tests will fail with error `Error: could not detect network (event="noNetwork", code=NETWORK_ERROR, version=providers/5.7.2)`

## Official Links

- [Website](https://zksync.io/)
- [Documentation](https://v2-docs.zksync.io/dev/)
- [GitHub](https://github.com/matter-labs)
- [Twitter](https://twitter.com/zksync)
- [Discord](https://discord.gg/nMaPGrDDwk)


------------------------------------------------------------------------------------------------------------------

# Personal Notes

After completing the initial file setup for the quickstart section of the Docs, decided to add the zkSync local dev setup, that is, the docker containers for the testing L1 and L2 networks.

Did not clone the repo: https://github.com/matter-labs/local-setup

Copied the following files only:
  - docker-compose.yml
  - rich-wallets.json
  - clear.sh
  - start.sh

The idea is to test first with the setup as it is given.

Second step will be to deploy and interact with the zkSync era testnet.


# Instructions

## Usage

To bootstrap zkSync locally, run the start.sh script:

> ./start.sh

This command will bootstrap three docker containers:

    Postgres (used as the database for zkSync).
    Local Geth node (used as L1 for zkSync).
    zkSync server itself.

By default, the HTTP JSON-RPC API will run on port 3050, while WS API will run on port 3051.

Note, that it is important that the first start script goes uninterrupted. If you face any issues after the bootstrapping process unexpectedly stopped, you should reset the local zkSync state and try again.

## Resetting zkSync state

To reset the zkSync state, run the ./clear.sh script:

> ./clear.sh

Note, that you may receive a "permission denied" error when running this command. In this case, you should run it with the root privileges:

> sudo ./clear.sh

## Rich wallets

Local zkSync setup comes with some "rich" wallets with large amounts of ETH on both L1 and L2.

The full list of the addresses of these accounts with the corresponding private keys can be found here.

Also, during the initial bootstrapping of the system, several ERC-20 contracts are deployed locally. Note, that large quantities of these ERC-20 belong to the wallet 0x36615Cf349d7F6344891B1e7CA7C72883F5dc049 (the first one in the list of the rich wallet). Right after bootstrapping the system, these ERC-20 funds are available only on L1.

## Using custom database/L1

To use custom Postgres database or Layer 1, you should change the environment parameters in the docker-compose file:

environment:
    - DATABASE_URL=postgres://postgres@postgres/zksync_local
    - ETH_CLIENT_WEB3_URL=http://geth:8545

    DATABASE_URL is the URL to the Postgres database.
    ETH_CLIENT_WEB3_URL is the URL to the HTTP JSON-RPC interface of the L1 node.

## Local testing example

You can an example of hardhat project that utilizes local testing capabilities here.

To run tests, clone the repo and run yarn test:

git clone https://github.com/matter-labs/tutorial-examples.git
cd local-setup-testing
yarn test


-------------------------------------------------------------------------------------------------