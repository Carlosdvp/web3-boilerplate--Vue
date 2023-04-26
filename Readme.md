# Web3 Boilerplate App with Vue

## File Structure

### L2-zksync

- /contracts
- /deploy
- /test

### vue-frontend

- /public
- /src
  - /assets
  - /components

This is a template which should help you get started developing a web3 application with Vue, Tailwind and Typescript.

-----------------------------------------------------------------------------------------------------

## Obstacles Faced

## Deployment to Local zkSync network

### 1. Hardcoded Chain Details

The original dApp is configured to connect to the zkSync testnet and the values (url, chainId, etc) are all hardcoded into the dApp.

Steps to rectify this:

- Identify the Components/views where there are methods that references this.
  - for example: const provider = new Provider("https://zksync2-testnet.zksync.dev");
- Move the variable value to the .env file
- Make sure that there are no chain url endpoints or chainId's hardcoded in the dApp

This will make it easier to deploy a dApp to either the local test environment or to the zkSync testnet or to the mainnet.

### Findings

Part of the problem, aside from the hardcoded url's, was that the hardhat config was only exporting the tesnet url and not the local url.

This can be solved in one of two ways:
  - one, which is the option I selected, is to simply add the local test network to the hardhat.config
  - the other one, the better option for larger projects, would be to get the steps down to swith from TEST to DEV node environments.


Greeter Deployed Address: '0x6E6bc3D438d0f4Fb61c2141c97F008507E7bb183'

One problem resolved: now my greeter contract was deployed correclty and I can read the initial message in the UI.

## Remaining Problems:

- Unrecognized chanId "0x270" (although that is the id for the local chain and I added it manually to metamask)
- Unknown account #0 (operation="getAddress") -- the account is being populated. I think this might be due to the previous error, since the chain is not being recognized the wallet data is not being pulled into the dApp.

### Solutions

- I need to find a way to resolve the first issue, without a network connection to the wallet trying to address the 2nd issue would be pointless.

