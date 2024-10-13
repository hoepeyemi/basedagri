# EcoCollect

## Project Description
EcoCollect is an innovative decentralized application (dApp) designed to promote environmental sustainability by incentivizing the collection and recycling of plastic waste. This project allows waste pickers to deposit collected plastics and receive payments from registered recycling companies, fostering a cleaner environment while rewarding efforts toward sustainability.

## Importance in Our Current Society
Plastic pollution is a critical global issue, with millions of tons of plastic waste ending up in oceans and landfills every year. EcoCollect provides a decentralized platform that not only addresses this problem but also encourages individuals and companies to actively participate in recycling. By utilizing blockchain technology, the platform ensures transparency, fairness, and traceability in waste management, offering a scalable solution to combat plastic waste globally.

## Project Application and Usage
EcoCollect is primarily used by two groups:
- **Pickers**: Individuals who collect plastic waste can register on the platform, deposit plastics, and receive tokens as rewards for their contribution.
- **Recycling Companies**: Companies can register to pay pickers for the plastics deposited, ensuring the collected waste is processed responsibly.

Users can interact with the system through a user-friendly interface that provides dashboards for pickers and companies, enabling them to track deposits, payments, and transactions efficiently.

## Technologies Used
- **Solidity**: Smart contracts were written in solidity.
- **Hardhat**: Used to compile, deploy, and manage the smart contracts on the Base Sepolia testnet.
- **React**: To build the interactive frontend interface.
- ***OnChainKit***: For seamless on-chain interactions with the smart contracts.
- **Tailwind CSS**: To design a responsive and visually appealing frontend.
- ***Base Sepolia Testnet***: The blockchain environment where the contracts are deployed and tested.

## How to Install, Compile, and Deploy the Smart Contracts

1. **Install Dependencies**: 
   ```bash
   npm install
   ```

2. **Compile Smart Contracts**:
   ```bash
   npx hardhat compile
   ```

3. **Deploy Contracts**:
   ```bash
   npx hardhat ignition deploy ./ignition/modules/deploy.ts --network base-sepolia
   ```

4. **Verify Contracts**:
   ```bash
   npx hardhat verify --network base-sepolia <deployed address>
   ```

### Deployed Contract Addresses
- **Recylox**: `0xacFfd04f690a7D718A23C07276c2bFCcF2Ee7E7A`
- **Recycle**: `0xD0BFe7253aB8EdCe6Fb46Eba473e13Ee9336aE82`

You can view the verified contracts on the Base Sepolia Block Explorer:
- [Recylox Contract](https://base-sepolia.blockscout.com/address/0xacFfd04f690a7D718A23C07276c2bFCcF2Ee7E7A#code)
- [Recycle Contract](https://base-sepolia.blockscout.com/address/0xD0BFe7253aB8EdCe6Fb46Eba473e13Ee9336aE82#code)

## Installation and Running the Frontend

1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Screenshots

1. **Home Page**  
   ![Home Page](path-to-image-1)
   
2. **About Us Page**  
   ![About Us Page](path-to-image-2)

3. **Contact Us Page**  
   ![Contact Us Page](path-to-image-3)

4. **Picker Dashboard**  
   ![Picker Dashboard](path-to-image-4)

5. **Company Dashboard**  
   ![Company Dashboard](path-to-image-5)

6. **Company Dashboard**  
   ![Company Dashboard](path-to-image-6)

## contributors
1. Abdulyekeen Lukman
2. Olayiwola Saheed
