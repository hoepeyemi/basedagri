## Recoin
Website: http://url.netlify.com
<br />
Smart Contract: https://github.com/

## Stacks:
Solidity, React, bootstrap & Third-web

## NOTE: Use Goerli Network to test & Pinata for image url

## Building the project

After any changes to the contract, run:

```bash
#For testing
yarn run dev

# production
yarn run build
# or
yarn build
```

to compile your contracts. This will also detect the [Contracts Extensions Docs](https://portal.thirdweb.com/contractkit) detected on your contract.

## Deploying Contracts

When you're ready to deploy your contracts, just run one of the following command to deploy you're contracts:


### Ether.js Documentation

**Introduction**

Ether.js is a JavaScript library that provides a easy and simple way to interact with the Ethereum blockchain. The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. It allows developers to build decentralized applications (DApps) and integrate Ethereum functionality into their projects. This documentation will provide the necessary details on the installation, setup, and usage of Ether.js in RecCoin Platform Project.

**Table of Contents** 
- Installation
- Setup
- Key Concepts
- Usage Examples
- API Reference
- Resources

**Installation**

To install Ether.js, you can use npm (Node Package Manager). Open your project directory and run the following command:
`npm install ethers@beta-exports`
This will download and install the Ether.js package along with its dependencies.

**Setup**
Once Ether.js is installed, you need to set it up in your project. Here are the steps:

Import Ether.js into your JavaScript file:
_node.js require_
`import { ethers } from "ethers";`

**Common Terminology**

- Provide: A [Provider](https://docs.ethers.org/v6/api/providers/#Provider) is a read-only connection to the blockchain, which allows querying the blockchain state, such as account, block or transaction details, querying event logs or evaluating read-only code using call.
- Signer: A [Signer](https://docs.ethers.org/v6/api/providers/#Signer) wraps all operations that interact with an account. A Signer is a class which (usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.
- Contract: A [Contract](https://docs.ethers.org/v6/api/contract/#Contract) is a program that has been deployed to the blockchain, which includes some code and has allocated storage which it can read from and write to.
- Wallets: Wallets in Ether.js represent Ethereum accounts. They allow you to sign and send transactions, interact with smart contracts, and manage your account's balance and transactions.
- Transactions: Transactions in Ether.js represent actions performed on the Ethereum network, such as sending Ether or interacting with a smart contract. You can create, sign, and send transactions using Ether.js.

**Connect to an Ethereum provider:**
_Connecting to MetaMask_
```
let signer = null;

let provider;
if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()
} else {
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
}
```
_Connecting to an RPC client_
```
const provider = new ethers.JsonRpcProvider(url)
const signer = await provider.getSigner()
```

_Basic Queries_
```
await provider.getBlockNumber()

balance = await provider.getBalance("ethers.eth")
ethers.utils.formatEther(balance)

ethers.utils.parseEther("1.0")

```
You're ready to start using Ether.js in your project!


**Usage Examples**

_Sending Ether:_
```
const sendEther = async (to, amount) => {
  const transaction = {
    to: to,
    value: ether.utils.parseEther(amount.toString())
  };
  const signedTransaction = await signer.sendTransaction(transaction);
  console.log('Transaction hash:', signedTransaction.hash);
};
```
_Deploying a smart contract:_
```
const deployContract = async () => {
  const contract = new ether.ContractFactory(contractAbi, contractBytecode, signer);
  const deployContract = await contract.deploy();
  console.log('Contract address:', deployContract.address);
};
```

**API Reference**
For detailed information about the available classes, methods, and properties in Ether.js, refer to the official API reference: [Ether.js API Reference](https://docs.ethers.org/v6/api/)


**Resources**
Here are some additional resources that you may find helpful for working with Ether.js:

[Ether.js Documentation](https://docs.ethers.org/v6/)
[Ether.js GitHub Repository](https://github.com/ethers-io/ethers.js/)
[Ethereum Official Website](https://ethereum.org/)

These resources provide further information, examples, and references to help you explore and utilize Ether.js effectively.

```bash
npm run deploy
# or
yarn deploy
```