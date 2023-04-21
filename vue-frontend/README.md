## Web 3.0 template

This template should help get you started developing a web3.0 application with Vue.js (v3), TailwindCSS and Typescript. This is a work in progress project and I'll be adding new features.

## Requirements
This template requires de following environment variables

VITE_BLOCKCHAIN_NETWORK_NAME: Name of the network in which the app runs (or where the smart contracts are deployed)
VITE_BLOCKCHAIN_NETWORK_ID: Network Id in format 0xN. Rinkeby is 0x4 for example.

## Features
This projects includes multiple features out of the box including:

- Metamask wallet integration: there is a "Connect Wallet" button that triggers Metamask authorization
- State management: the metamask wallet account info is kept in a store using Pinia. That way, it can be accessed from multiple views and components.
- TailwindCSS integration
- Vue router

### Environment variables
Rename the .env.example file to .env and change the variables to the protocol name and id (in 0x format) for your project.

### Done
 - Identify if connected blockchain is the correct one.

### To-Do:
- Disconnect wallet button
- Support for multiple accounts instead of just one
- Support for other wallets

## Building this project step-by-step

1. Created new Vite project with npm init vite@latest web3-template-vue 

2. Installed all dependenciess npm install

3. Installed TailwindCSS following the official guide

4. Installed Pinia npm i pinia and created a basic wallet store in src/store/wallet.ts

5. Installed vue-router (v4) and created a couple of views

6. Created a NavBar component with the buttons to connect Metamask wallet, save wallet info in store and navigate between routes

7. Installed node types to use process.env with npm install @types/node --save-dev

8. Fixed @ imports in vite.config.js