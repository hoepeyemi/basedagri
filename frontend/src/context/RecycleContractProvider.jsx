import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAccount, useReadContracts } from "wagmi";
import { RECYCLE_CONTRACT, RECYCLE_TOKEN_CONTRACT } from "../utils";
import { recyloxABI } from "./recylox-abi";
import { writeContract, readContract } from '@wagmi/core'
import { recycleABI } from "./recycle-abi";
import { getConfig } from "../../wagmi";
import Swal from "sweetalert2";


export const RecycleContractContext = createContext()
export const useRecycleContract = () => useContext(RecycleContractContext);
const RecycleContractProvider = ({children}) => {
  const account = useAccount()
  const [companyTransactionHistory, setCompanyTransactionHistory] = useState([])
  const [pickerTransactionHistory, setPickerTransactionHistory] = useState([])

  const {data, error, isLoading, refetch} = useReadContracts({
    contracts: [
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "getRegisteredPickerCount",
      },
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "getRegisteredCompanyCount",
      },
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "balanceOf",
      },
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "totalTransactions",
      },
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "getPicker",
        args:[account?.address]
      },
      {
        address: RECYCLE_CONTRACT,
        abi: recycleABI,
        functionName: "getCompany",
        args:[account?.address]
      },
    
    
    
    ],
   
  },)
  useEffect(() => {
    if(!account?.address) return
    refetch()
  }, [account?.address, refetch])
  

 const picker_count  = data?.[0].result || 0
const company_count = data?.[1].result || 0
const tokenHolderBalance = data?.[2].result || 0
const totalTransaction = data?.[3].result || 0
const picker = data?.[4].result || null
const company = data?.[5].result || null
let account_category 

if(picker && picker){
  account_category = "picker"
}
if(company ){
  account_category = "company"
}

if (data && !error){
  for (let index = 0; index < totalTransaction; index++) {
 readContract(config, {
      abi: recycleABI,
      address: RECYCLE_CONTRACT,
      functionName: 'transactions',
      args: [index],
    }).then((result) => {
      console.log(`transaction struct ${index} => `, result);
    }).catch((error) => {
      console.error('Failed to fetch transaction details:', error);
    })
    

    // const company_address = transaction[1].toLowerCase();
    // const picker_address = transaction[2].toLowerCase();
    // const connected_account = _connectedAccount.toLowerCase();

    // console.log("addresses to lower case => ", company_address, picker_address, connected_account);

    // // check if connected address matches any of the companies address
    // if (company_address === connected_account ) {
    //   companyTransactionHistory.push(transaction);
    // }

    // // check if connected address matches any of the companies address
    // if (picker_address === connected_account) {
    //   pickerTransactionHistory.push(transaction);
    // }
  }  // ends transaction loop

}
const payPicker = useCallback(async (transactionId) => {
  try {
    const result = await writeContract( 
      getConfig(), {
      account: account?.address,
      connector:account?.connector,
      abi:recycleABI,
      address: RECYCLE_CONTRACT,
      functionName: 'payPicker',
      args: [
        transactionId
      ],
    })
  
    console.log('Picker paid successfully!');
    // Additional logic or UI updates after successful payment
 
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
    return result
  } catch (error) {
    console.error('Failed to pay picker:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: `Failed to pay picker: ${error}`,
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })

    return;
  }
}, [account?.address, account?.connector])

const validatePlastic = useCallback(async (transactionId) => {
  try {
    const result = await writeContract( 
      getConfig(), {
      account: account?.address,
      connector:account?.connector,
      abi:recycleABI,
      address: RECYCLE_CONTRACT,
      functionName: 'validatePlastic',
      args: [
        transactionId
      ],
    })
  
    console.log('Plastic validated successfully!');
    // Additional logic or UI updates after successful payment
 
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
    return result
  } catch (error) {
    console.error('Failed to validate picker:', error);

    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: `Failed to validate plastic: ${error}`,
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
    return;
  }
}, [account?.address, account?.connector])


  return (
    <RecycleContractContext.Provider value={{
      companyTransactionHistory,
      pickerTransactionHistory,
      account_category,
      picker_count,
      company_count,
      tokenHolderBalance,
      totalTransaction,
      payPicker,
      validatePlastic
    }}>{children}</RecycleContractContext.Provider>
  )
}

export default RecycleContractProvider