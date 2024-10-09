/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { recyloxABI } from './recylox-abi';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { recycleABI } from './recycle-abi';

export const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {

  
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [accountBalance, setAccountBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('')
  const [adminAddress, setAdminAddress] = useState('');

  
/*******************************  recylox method call loading and success states  *********************************/

/**loading**/
const [mintLoading, setMintLoading] = useState(false);
const [transferTokensLoading, setTransferTokensLoading] = useState(false);
const [transferFromLoading, setTransferFromLoading] = useState(false);
const [burnLoading, setBurnLoading] = useState(false);
const [approveLoading, setApproveLoading] = useState(false);

/**success*/
const [mintSuccessful, setMintSuccessful] = useState(false);
const [transferTokensSuccessful, setTransferTokensSuccessful] = useState(false);
const [transferFromSuccessful, setTransferFromSuccessful] = useState(false);
const [burnSuccessful, setBurnSuccessful] = useState(false);
const [approveSuccessful, setApproveSuccessful] = useState(false);



/*******************************  recycle state variables   *********************************/
    const [companyStruct, setCompanyStruct] = useState([]);
    const [recycleContract, setRecycleContract] = useState(null);    
    const [picker_count, set_Picker_Count] = useState(0);
    const [company_count, set_Company_Count] = useState(0);
    const [account_category, set_account_category] = useState('');
    const [tokenHolderBalance, setTokenHolderBalance] = useState(0);
    const [totalTransaction, setTotalTransaction] = useState(0);
    const [companyTransactionHistory, setCompanyTransactionHistory] = useState([]);
    const [pickerTransactionHistory, setPickerTransactionHistory] = useState([]);
  

  useEffect (() => {
    try {
      if (window.ethereum.selectedAddress) {
        initializeContract();
      }
    } catch (error) {
      console.log(error);
    } 

  }, [])

  const initializeContract = async () => {
    try {
      setLoading(true)
      if (window.ethereum) {
        const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // save connected wallet address
        const _connectedAccount = getAccounts[0];
        setConnectedAccount(_connectedAccount);
        console.log("account ",  getAccounts[0]);
        const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        setProvider(ethereumProvider);
        const signer = ethereumProvider.getSigner();

        /* recylox contract */
        const contractAddress = '0x509D44Bf4E1E5E696eA288eC4fF1114f79a09AC9'; // Replace with the actual contract address
        const contract = new ethers.Contract(contractAddress, recyloxABI, signer);
        console.log('contract =>', contract);
        setContract(contract);

/*******************************    get recycle contract   *********************************/
        const recycleContractAddress = '0x96843178AEf01A428798177F45E809Dc6F7b76f2'; // Replace with the actual contract address
        const recycleContract = new ethers.Contract(recycleContractAddress, recycleABI, signer);
        console.log('recycle contract =>', recycleContract);
        setRecycleContract(recycleContract);

/*******************************    recylox functionalities   *********************************/

        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const totalSupply = await contract.totalSupply();
        const yourAccountAddress = '0x1928062edfAFbCCb7D1C788B24F6aCdE80869048';// Replace with your actual Ethereum address
        setAdminAddress(yourAccountAddress);
        const accountBalance = await contract.balanceOf(yourAccountAddress);

        console.log("account balance", accountBalance);
        setName(name);
        setSymbol(symbol);
        setDecimals(decimals);
        setTotalSupply(totalSupply);
        setAccountBalance(accountBalance);
        setLoading(false);

        console.log(accountBalance);
        console.log("name", name);
        console.log("symbol", symbol);


/*******************************    recycle functionalities   *********************************/       
          // get no of pickers
      const no_of_registered_pickers = await recycleContract.getRegisteredPickerCount();
      console.log('Registered picker count:', no_of_registered_pickers);
      set_Picker_Count(no_of_registered_pickers);
      console.log("no_of_registered_pickers =>", no_of_registered_pickers);

      // get no of companies
      const no_of_registered_companies = await recycleContract.getRegisteredCompanyCount();
      console.log('Registered company count:', no_of_registered_companies);
      set_Company_Count(no_of_registered_companies);
      console.log("no_of_registered_companies =>", no_of_registered_companies); 

      // get tokenholder balance
      const balance = await recycleContract.balanceOf();
      console.log("token balance", balance);
      setTokenHolderBalance(balance);

      // get total transaction in recycle smart contract
      const totalTransaction = await recycleContract.totalTransactions();
      setTotalTransaction(totalTransaction)
      const transactionCount = parseInt(totalTransaction.toString());
      console.log("totalTransaction => ", totalTransaction.toString());

      // array to store company or picker transaction history based on the connected account
      const companyTransactionHistory = []
      const pickerTransactionHistory = []

      // loop through the transactions mapping to get a particular transaction struct
      for (let index = 0; index < transactionCount; index++) {
        const transaction = await recycleContract.transactions(index);
        console.log(`transaction struct ${index} => `, transaction);

        const company_address = transaction[1].toLowerCase();
        const picker_address = transaction[2].toLowerCase();
        const connected_account = _connectedAccount.toLowerCase();

        console.log("addresses to lower case => ", company_address, picker_address, connected_account);

        // check if connected address matches any of the companies address
        if (company_address === connected_account ) {
          companyTransactionHistory.push(transaction);
        }

        // check if connected address matches any of the companies address
        if (picker_address === connected_account) {
          pickerTransactionHistory.push(transaction);
        }
      }  // ends transaction loop

      // save company and picker transaction history as state variables
      setCompanyTransactionHistory(companyTransactionHistory);
      setPickerTransactionHistory(pickerTransactionHistory);

      try {
        const picker = await recycleContract.getPicker(_connectedAccount);
        console.log("picker array", picker);
        console.log("picker name => ", picker[0]);
        if (picker[0]) {
          set_account_category("picker");
        }
      } catch (error) {
        console.log("picker array => ", error);
      } //ends getPicker
     
      // get company
      try {

        const companyStruct = await recycleContract.getCompany(_connectedAccount);
        console.log("company array", companyStruct);
        setCompanyStruct(companyStruct);

        if (companyStruct[0]) {
          set_account_category("company");

        } 
      } catch (error) {
        console.log("company array => ", error);
      } //ends getCompany
      

      } else {
        setLoading(false)
        // throw new Error('Please install MetaMask or any other Ethereum wallet extension.');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Please install MetaMask or any other Ethereum wallet extension.',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        console.log('Please install MetaMask or any other Ethereum wallet extension.')
      }
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error initializing contract: ${error.message}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      });
      console.error('Error initializing contract:', error);
    }
  }; // ends initializeContract

  const transferTokens = async (recipient, amount) => {
    setTransferTokensLoading(true)
    setTransferTokensSuccessful(false)
    try {
      if (contract) {
        const transaction = await contract.transfer(recipient, amount);
        await transaction.wait();
        // Perform any additional actions or update state as needed
        setTransferTokensSuccessful(true)
        setTransferTokensLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Transfer ${ethers.utils.formatEther(amount)} REC to ${recipient} successful!`,
          confirmButtonColor:"#006D44",
          preConfirm: () => {window.location.reload()},
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      } else {
        setTransferTokensLoading(false)
        setTransferTokensSuccessful(false)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `Contract is not initialized. Connect wallet to get started`,
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        throw new Error('Contract is not initialized.');
      }
    } catch (error) {
      setTransferTokensLoading(false)
      setTransferTokensSuccessful(false)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error transferring tokens: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      console.error('Error transferring tokens:', error);
    }
  };

    // Add the mintTokens function
  const mintTokens = async (account, amount) => {
    try {
      setMintLoading(true)
      if (contract) {
        const transaction = await contract.mint(account, amount);
        await transaction.wait();
        // Perform any additional actions or update state as needed
        setMintLoading(false)
        setMintSuccessful(true)
      } else {
        setMintLoading(false)
        setMintSuccessful(false)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Contract is not initialized. Connect wallet to get started',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        throw new Error('Contract is not initialized.');
        
      }
    } catch (error) {
      setMintLoading(false)
      setMintSuccessful(false)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error transferring tokens: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      console.error('Error transferring tokens:', error);
    }
  };

  // add burnTokens function
  const burnTokens = async (amount) => {
    setBurnLoading(true)
    setBurnSuccessful(false)
    try {
      if (contract) {
        const transaction = await contract.burn(amount);
        await transaction.wait();
        // Perform any additional actions or update state as needed
        setBurnSuccessful(true);
        setBurnLoading(false);
      } else {
        setBurnLoading(false);
        setBurnSuccessful(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Contract is not initialized. Connect wallet to get started',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        throw new Error('Contract is not initialized.');
      }
    } catch (error) {
      setBurnLoading(false)
      setBurnSuccessful(false)
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error burning tokens: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      console.error('Error burning tokens:', error);
    }
  };

  const approveTokens = async (spender, amount) => {
    setApproveLoading(true)
    setApproveSuccessful(false)
    try {
      if (contract) {
        const transaction = await contract.approve(spender, amount);
        await transaction.wait();
        // Perform any additional actions or update state as needed
        setApproveSuccessful(true)
        setApproveLoading(false)
      } else {
        setApproveLoading(false)
        setApproveSuccessful(false)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Contract is not initialized. Connect wallet to get started',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        throw new Error('Contract is not initialized.');
      }
    } catch (error) {
      setApproveLoading(false)
      setApproveSuccessful(false);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error approving tokens:', ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      console.error('Error approving tokens:', error);
    }
  };

  const transferFrom = async (sender, recipient, amount) => {
    try {
      setTransferFromLoading(true)
      setTransferFromSuccessful(false)
      if (contract) {
        const transaction = await contract.transferFrom(sender, recipient, amount);
        await transaction.wait();
        // Perform any additional actions or update state as needed
         // Perform any additional actions or update state as needed
         setTransferFromSuccessful(true)
         setTransferFromLoading(false)
      } else {
        setTransferFromLoading(false)
        setTransferFromSuccessful(false)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Contract is not initialized. Connect wallet to get started',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
        throw new Error('Contract is not initialized.');
      }
    } catch (error) {
      setTransferFromLoading(false)
      setTransferFromSuccessful(false);
      
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error transferring tokens: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      console.error('Error transferring tokens from:', error);
    }
  };


  return (
    <TokenContext.Provider
      value={{
        loading,
        contract,
        adminAddress,
        name,
        symbol,
        decimals,
        totalSupply,
        accountBalance,
        provider, // Include the provider in the context value
        connectedAccount,
        initializeContract,
        transferTokensLoading, approveLoading, burnLoading, mintLoading, transferFromLoading,
        transferTokensSuccessful, approveSuccessful, burnSuccessful, mintSuccessful, transferFromSuccessful,
        transferTokens,
        mintTokens,
        burnTokens,
        approveTokens,
        transferFrom,
       

        recycleContract,
        companyStruct,
        picker_count,
        company_count,
        account_category,
        tokenHolderBalance,
        companyTransactionHistory,
        pickerTransactionHistory
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

