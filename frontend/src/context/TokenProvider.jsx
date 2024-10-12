import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAccount, useReadContracts } from "wagmi";
import { RECYCLE_CONTRACT, RECYCLE_TOKEN_CONTRACT } from "../utils";
import { recyloxABI } from "./recylox-abi";
import { writeContract } from '@wagmi/core'
import { recycleABI } from "./recycle-abi";
import Swal from "sweetalert2";
import { getConfig } from "../../wagmi";


export const TokenContext = createContext()
export const useTokenContract = () => useContext(TokenContext);
const TokenProvider = ({children}) => {
  const account = useAccount()
  const {data, error, isLoading, refetch} = useReadContracts({
    contracts: [
      {
        address: RECYCLE_TOKEN_CONTRACT,
        abi: recyloxABI,
        functionName: "name",
      },
      {
        address: RECYCLE_TOKEN_CONTRACT,
        abi: recyloxABI,
        functionName: "symbol",
      },
      {
        address: RECYCLE_TOKEN_CONTRACT,
        abi: recyloxABI,
        functionName: "decimals",
      },
      {
        address: RECYCLE_TOKEN_CONTRACT,
        abi: recyloxABI,
        functionName: "totalSupply",
      },
    
    
    
    ],
   
  },)
  useEffect(() => {
    if(!account?.address) return
    refetch()
  }, [account?.address, refetch])
  

 const name  = data?.[0].result || ''
const symbol = data?.[1].result || ''
const decimals = data?.[2].result || 0
const totalSupply = data?.[3].result || 0

const transferTokens = useCallback(async (recipient, amount) => {

  try {
    if (account?.address) {
      const result = await writeContract(
        
        getConfig(), {
          
        account: account?.address,
        connector:account?.connector,
        abi:recyloxABI,
        
        address: RECYCLE_TOKEN_CONTRACT,
        functionName: 'transfer',
        args: [
          recipient,
          amount
        ],
      })
      // const transaction = await contract.transfer(recipient, amount);
      // await transaction.wait();
      // Perform any additional actions or update state as needed
 
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

    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: `Error transferring tokens: ${error}`,
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
    console.error('Error transferring tokens:', error);
  }
}, [account?.address, account?.connector])

  return (
    <TokenContext.Provider value={{name, symbol, decimals, totalSupply, transferTokens,refetch}}>{children}</TokenContext.Provider>
  )
}

export default TokenProvider