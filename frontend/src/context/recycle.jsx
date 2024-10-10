// recycle.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { recycleABI } from './recycle-abi';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useToken } from './recylox';

export const RecycleContext = createContext();

export const useRecycle = () => useContext(RecycleContext);

export const RecycleProvider = ({ children }) => {

  const {recycleContract, connectedAccount} = useToken();

  const [companies, setCompanies] = useState([]);
  const [pickers, setPickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  // const [connectedAccount, setConnectedAccount] = useState('');
  const [isMethodCallLoading, setIsMethodCallLoading] = useState(false);
  const [isMethodCallSuccessful, setIsMethodCallSuccessful] = useState(false);
  const [totalTransaction, setTotalTransaction] = useState(0)
  
  // added variables
  const [picker_count, set_Picker_Count] = useState(0);
  const [company_count, set_Company_Count] = useState(0);
  const [account_category, set_account_category] = useState('');
  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [pickerStruct, setPickerStruct] = useState({});
  const [companyStruct, setCompanyStruct] = useState({});
  const [tokenHolderBalance, setTokenHolderBalance] = useState(0);

  useEffect(() => {
    const recycle_status = localStorage.getItem("connectRecycle");
    console.log(recycle_status);

    // if (recycle_status == 'true') {
    //   initializeRecycleContract()
    // }
   
  },[])

  const initializeRecycleContract = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        const getAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // save connected wallet address
        const _connectedAccount = getAccounts[0];
        setConnectedAccount(getAccounts[0]);
        const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        setProvider(ethereumProvider);
        const signer = ethereumProvider.getSigner();
        const contractAddress = '0x96843178AEf01A428798177F45E809Dc6F7b76f2'; // Replace with the actual contract address
        const contract = new ethers.Contract(contractAddress, recycleABI, signer);
        console.log('contract =>', contract);
        setContract(contract);
      console.log("recycle contract =>", contract);

      localStorage.setItem("connectRecycle", true);

      // get no of pickers
      const no_of_registered_pickers = await contract.getRegisteredPickerCount();
      console.log('Registered picker count:', no_of_registered_pickers);
      set_Picker_Count(no_of_registered_pickers);
      console.log("no_of_registered_pickers =>", no_of_registered_pickers);

      // get no of companies
      const no_of_registered_companies = await contract.getRegisteredCompanyCount();
      console.log('Registered company count:', no_of_registered_companies);
      set_Company_Count(no_of_registered_companies);
      console.log("no_of_registered_companies =>", no_of_registered_companies); 

      // get tokenholder balance
      const balance = await contract.balanceOf();
      console.log("token balance", balance);
      setTokenHolderBalance(balance);

      // get total transaction
      const totalTransactions = await contract.totalTransactions();
      setTotalTransaction(totalTransactions)
      console.log("totalTransaction => ", totalTransactions);

      try {
        const transaction = await contract.transactions(0);
        console.log("transaction structs =>", transaction);
        
      } catch (error) {

        console.log("transactions struct =>", error.reason);
        
      }

      try {
        const picker = await contract.getPicker(_connectedAccount);
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
        const company = await contract.getCompany(_connectedAccount);
        console.log("company array", company);
        if (company[0]) {
          set_account_category("company");

        } 
      } catch (error) {
        console.log("company array => ", error);
      } //ends getCompany
      

       // Fetch companies and pickers from the contract
       /*
       const companies = await contract.getCompanyAddresses();
       const pickers = await contract.getPickerAddresses();
       console.log("companies =>", companies);
       console.log("pickers =>", pickers);
       setCompanies(companies);
       setPickers(pickers);

       */
    
      /*
      get picker struct. Also use this to cartegorize address.
      direct users to their respective dashboard based on this
      */
    //  getPicker
    
      
    } else {
      setLoading(false);
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
      console.log('Please install MetaMask or any other Ethereum wallet extension.');
    }
    } catch (error) {
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
      })
      setLoading(false);
    }
}; //ends initializeRecycleContract()


/**********************************   pickers functionalities   ************************************ */
  const registerPicker = async (name, email) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await recycleContract.registerPicker(name, email);
      await tx.wait();
      const newPicker = await recycleContract.getPicker(connectedAccount);
      setPickers([...pickers, newPicker]);
      setIsMethodCallLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Picker created successfully!',
        confirmButtonColor:"#006D44",
        // preConfirm: () => {window.location.reload()},
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
     
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error registering user:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error registering user: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }
  };

  const editPicker = async (name, email) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).editPicker(name, email);
      await transaction.wait();
      console.log('Picker edited successfully!');
      // Additional logic or UI updates after successful edit
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to edit picker:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const updatePickerName = async (name) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updatePickerName(name);
      await transaction.wait();
      console.log('Picker name updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update picker name:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };
  
  const updatePickerEmail = async (email) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updatePickerEmail(email);
      await transaction.wait();
      console.log('Picker email updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update picker email:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  }

  const getPicker = async (address) => {
    try {
      const picker = await contract.getPicker(address);
     
      console.log('Picker details:', picker);
      // Additional logic or UI updates with the picker data
    } catch (error) {
      console.error('Failed to fetch picker details:', error);
      // Handle error scenario
    }
  };

  const getRegisteredPickerCount = async () => {
    try {
      const count = await contract.getRegisteredPickerCount();
      console.log('Registered picker count:', count);
      set_Picker_Count(count);
      console.log("picker count =>", count);
      // Additional logic or UI updates with the count data
    } catch (error) {
      console.error('Failed to fetch registered picker count:', error);
      // Handle error scenario
    }
  };  
  
  const payPicker = async (transactionId) => {
    try {
      setIsMethodCallLoading(true);
      // const transaction = await contract.connect(signer).payPicker(transactionId);
      const transaction = await recycleContract.payPicker(transactionId);
      await transaction.wait();
      console.log('Picker paid successfully!');
      // Additional logic or UI updates after successful payment
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Payment successful!',
        confirmButtonColor:"#006D44",
        // preConfirm: () => {window.location.reload()},
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    } catch (error) {
      console.error('Failed to pay picker:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
      const payError = error.reason.split(':');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Failed to pay picker: ${payError[2]}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }
  };
   
  const removePicker = async (pickerAddress) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await contract.removePicker(pickerAddress);
      await tx.wait();
      setPickers(pickers.filter((address) => address !== pickerAddress));
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error removing picker:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

/**********************************    Company functionalities  ************************************ */
  const registerCompany = async (name, minWeightRequirement, maxPricePerKg, active) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await recycleContract.registerCompany(name, minWeightRequirement, maxPricePerKg, active);
      await tx.wait();
      const newCompany = await recycleContract.getCompany(connectedAccount);
      setCompanies([...companies, newCompany]);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Company created successfully!',
        confirmButtonColor:"#006D44",
        // preConfirm: () => {window.location.reload()},
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    } catch (error) {
      console.error('Error registering company:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Error registering company: ${error.reason}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }
  };

  const editCompany = async (name, minWeightRequirement, maxPricePerKg, active) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).editCompany(
        name,
        minWeightRequirement,
        maxPricePerKg,
        active
      );
      await transaction.wait();
      console.log('Company edited successfully!');
      // Additional logic or UI updates after successful edit
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to edit company:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const updateCompanyName = async (name) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updateCompanyName(name);
      await transaction.wait();
      console.log('Company name updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update company name:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };
  
  const updateCompanyMinWeightRequirement = async (minWeightRequirement) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updateCompanyMinWeightRequirement(minWeightRequirement);
      await transaction.wait();
      console.log('Company minimum weight requirement updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update company minimum weight requirement:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const updateCompanyMaxPricePerKg = async (maxPricePerKg) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updateCompanyMaxPricePerKg(maxPricePerKg);
      await transaction.wait();
      console.log('Company maximum price per kg updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update company maximum price per kg:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };
  
  const updateCompanyActiveStatus = async (active) => {
    try {
      setIsMethodCallLoading(true);
      const transaction = await contract.connect(signer).updateCompanyActiveStatus(active);
      await transaction.wait();
      console.log('Company active status updated successfully!');
      // Additional logic or UI updates after successful update
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Failed to update company active status:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };
  
  const removeCompany = async (companyAddress) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await contract.removeCompany(companyAddress);
      await tx.wait();
      setCompanies(companies.filter((address) => address !== companyAddress));
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error removing company:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const depositPlastic = async (companyAddress, weight) => {
    try {
      setIsMethodCallLoading(true);
      // const transaction = await contract.connect(signer).depositPlastic(companyAddress, weight);
      const transaction = await recycleContract.depositPlastic(companyAddress, weight);
      await transaction.wait();
      
      console.log('Plastic deposited successfully!');
      // Additional logic or UI updates after successful deposit
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Plastic deposited successfully!',
        confirmButtonColor:"#006D44",
        // preConfirm: () => {window.location.reload()},
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    } catch (error) {
      console.error('Failed to deposit plastic:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
      const _error = error.reason.split(':');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Failed to validate plastic: ${_error[2]}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }
  };
  
  const validatePlastic = async (transactionId) => {
    try {
      setIsMethodCallLoading(true);
      // const transaction = await contract.connect(signer).validatePlastic(transactionId);
      const transaction = await recycleContract.validatePlastic(transactionId);
      await transaction.wait();
      console.log('Plastic validated successfully!');
      // Additional logic or UI updates after successful validation
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Picker validated successfully!',
        confirmButtonColor:"#006D44",
        // preConfirm: () => {window.location.reload()},
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    } catch (error) {
      console.error('Failed to validate plastic:', error);
      // Handle error scenario
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
      const validateError = error.reason.split(':');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Failed to validate plastic: ${validateError[2]}`,
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }
  };
  
  const createRequest = async (companyId, material, quantity) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await contract.createRequest(companyId, material, quantity);
      await tx.wait();
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error creating request:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await contract.approveRequest(requestId);
      await tx.wait();
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error approving request:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      setIsMethodCallLoading(true);
      const tx = await contract.rejectRequest(requestId);
      await tx.wait();
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(true);
    } catch (error) {
      console.error('Error rejecting request:', error);
      setIsMethodCallLoading(false);
      setIsMethodCallSuccessful(false);
    }
  };

  const GetCompany = async() => {
    const company = await contract.getCompany(connectedAccount);
    if (company.name) {
      setCompanyStruct({
        name: company.name,
        minWeightRequirement: company.minWeightRequirement,
        maxPricePerKg: company.maxPricePerKg
      })
    }
  }

  console.log("recycle account categor =>", account_category );
  return (
    <RecycleContext.Provider
      value={{
        // companies,
        pickers,
        loading,
        provider,
        contract,
        connectedAccount,
        isMethodCallLoading,
        isMethodCallSuccessful,
        picker_count,
        company_count,
        account_category,
        pickerStruct,
        companyStruct,
        tokenHolderBalance,
        registerPicker,
        editPicker,
        getPicker,
        updatePickerName,
        updatePickerEmail,
        getRegisteredPickerCount,
        payPicker,
        removePicker,
        registerCompany,
        editCompany,
        updateCompanyName,
        updateCompanyMinWeightRequirement,
        updateCompanyMaxPricePerKg,
        updateCompanyActiveStatus,
        removeCompany,
        depositPlastic,
        validatePlastic,
        createRequest,
        approveRequest,
        rejectRequest,
        initializeRecycleContract,
        GetCompany
      }}
    >
      {children}
    </RecycleContext.Provider>
  );
};

RecycleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

