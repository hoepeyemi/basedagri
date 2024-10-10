import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import CompanyDashboardLayout from "../../components/dashboard_components/CompanyDashboardLayout"
import { CompanyDashboardData } from "../../data/DepositTransactionData";
import closeIcon from "../../assets/close.svg";
import { useToken } from "../../context/recylox";
import eyesIcon from '../../assets/eyesIcon.svg';
import eyesOpenIcon from '../../assets/eyeOpenIcon.svg';
import { useRecycle } from "../../context/recycle";
import usersIcon from '../../assets/users.svg'
import merchantIcon from '../../assets/merchant.svg'
import tickIcon from '../../assets/tickIcon.svg'
import { ethers } from "ethers";
import Swal from "sweetalert2";

// validate plastic content
const ValidatePlasticTab = ({ toggleClose }) => {

  const {account_category} = useToken();
  const { isMethodCallLoading,  validatePlastic} = useRecycle();

  const [transactionID, settransactionID] = useState('');
  const [isTermsChecked, setisTermsChecked] = useState(false)

  const ValidatePlastic = () => {
      if (account_category !== "company") {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Address not registered as a company',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      }
      else if (!transactionID) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Input transaction ID',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      }
      else if (!isTermsChecked) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Agree to Recylox Terms',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      } else {
          validatePlastic(transactionID)
      }
  }

  return (
    <div className="bg-[#005232] w-full mx-auto flex flex-col justify-start text-white p-10 font-montserrat">
        {/* close button */}
        <button className="flex flex-row justify-end" onClick={toggleClose}>
            <img src={closeIcon} alt="close-icon" className=" w-8 h-8" />
        </button>
        <h1 className="font-bold text-2xl my-8">Validate Plastic</h1>
        {/* company name */}
        <label htmlFor="transactionID">Transaction ID</label>
        <input type="text" name="transactionID" id="transactionID"
                onChange={(pka) => settransactionID(pka.target.value)}
                className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mb-4"
        />
        <div className="flex">
            <input type="checkbox" name="pay_picker_checkbox" id="pay_picker_checkbox"
                    className="h-6 w-6 mr-1"
                    onChange={() => setisTermsChecked(!isTermsChecked)}
                    value={isTermsChecked}
            />
            <span className="mr-1">I am sure the details I provided are correct</span>
        </div>
        {/* submit button */}
        <button 
            className="w-[60%] border-2 border-white rounded-lg p-2 bg-[#006D44] my-6"
            onClick={ValidatePlastic}
        >
        {isMethodCallLoading ? "Loading..." : "Validate"}
        </button>
    </div>
  );
};

// pay picker tab
const PayPickerTab = ({ toggleClose }) => {

  const {account_category} = useToken();
  const { isMethodCallLoading, isMethodCallSuccessful, payPicker} = useRecycle();

  const [transactionID, settransactionID] = useState('');
  const [payAmount, setPayAmount] = useState(0);
  const [isTermsChecked, setisTermsChecked] = useState(false)

  const PayPicker = () => {
      if (account_category !== "company") {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Address not registered as a company',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      }
      else if (!transactionID) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Input transaction ID',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      }
      else if (!isTermsChecked) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Agree to Recylox Terms',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      } else {
          payPicker(transactionID)
      }
  }

  return (
    <div className="bg-[#005232] w-full mx-auto flex flex-col justify-start text-white p-10 font-montserrat">
        {/* close button */}
        <button className="flex flex-row justify-end" onClick={toggleClose}>
            <img src={closeIcon} alt="close-icon" className=" w-8 h-8" />
        </button>
        <h1 className="font-bold text-2xl my-8">Pay Picker</h1>
        {/* company name */}
        <label htmlFor="transactionID">Transaction ID</label>
        <input type="text" name="transactionID" id="transactionID"
                onChange={(pka) => settransactionID(pka.target.value)}
                className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mb-4"
        />
        <div className="flex">
            <input type="checkbox" name="pay_picker_checkbox" id="pay_picker_checkbox"
                    className="h-6 w-6 mr-1"
                    onChange={() => setisTermsChecked(!isTermsChecked)}
                    value={isTermsChecked}
            />
            <span className="mr-1">I am sure the details I provided are correct</span>
        </div>
        {/* submit button */}
        <button 
            className="w-[60%] border-2 border-white rounded-lg p-2 bg-[#006D44] my-6"
            onClick={PayPicker}
        >
        {isMethodCallLoading ? "Loading..." : "Pay Picker"}
        </button>
    </div>
  );
};

// transfer reccoin tab
const TransferRecyloxTab = ({toggleClose}) => {

  const {transferTokens, isMethodCallSuccessful, isMethodCallLoading, account_category} = useToken();
  // const { account_category} = useRecycle();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);
  const [isTransferChecked, setIsTransferChecked] = useState(false);

  const TransferToken = async () => {

    if (account_category !== "company") {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'address not allowed to make transfer. Register to continue',
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    }  
    else if (!recipientAddress) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Input recipient address',
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
      }
      else if (!transferAmount) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Input transfer amount',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      } 
      else if(!isTransferChecked) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Agree to Recylox terms',
          confirmButtonColor:"#006D44",
          customClass: {
              icon: "font-montserrat",
              title: " font-montserrat text-[20px] text-[#000] font-[600]",
              text: "font-montserrat, text-[16px] text-[#000] font-[600]",
          }
        })
      }
      else {
        const transfer_amt = ethers.utils.parseEther(transferAmount);
        await transferTokens(recipientAddress, transfer_amt);
      }
  }
  
return   <div className="bg-[#005232] w-full mx-auto flex flex-col justify-start text-white p-10">
  {/* header */}
  <div className='relative'>
    {/* close button */}
    <button className="absolute right-0 -top-4" onClick={toggleClose}>
          <img src={closeIcon} alt="close-icon" className=" w-8 h-8" />
    </button>
    {/* title */}
    <h1 className='font-montserrat text-[1.5rem] font-[700] text-center my-8'>Transfer Recylox</h1>
  </div>
  {/* recipient's address */}
  <label htmlFor="recipientAddress" className=' font-montserrat text-[16px] font-[600]'>Recipient's Address</label>
  <input type="text" name="recipientAddress" id="recipientAddress"
      onChange={(adr) => setRecipientAddress(adr.target.value)}
      // className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mt-[1rem] mb-[2.5rem]"
      className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mb-4"
  />
  {/* amount to transfer */}
  <label htmlFor="transferAmount" className='font-montserrat text-[16px] font-[600]'>Amount</label>
  <input type="number" name="transferAmount" id="transferAmount"
      onChange={(amt) => setTransferAmount(amt.target.value)}
      // className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mt-[1rem]"
      className="outline-none border-2 border-x-0 border-t-0 bg-[#005232] p-2 mb-4"
  />
  {/* checkbox */}
  <div className="flex mt-[1.4rem]">
      <label htmlFor="check_box"
          onClick={() => setIsTransferChecked(!isTransferChecked)}
          className = {`relative h-6 w-6 p-[2px] mr-1 ${isTransferChecked ? 'bg-[#158B5E]' : ""} border-[2px] border-white transition duration-150 ease-in-out`}
      >
          {isTransferChecked ? <img src={tickIcon} alt="tick-icon" className='absolute top-1 h-3 w-3' /> : ""}
      </label>
      
      <span className="mr-1 italic font-[400] font-montserrat text-[0.8rem]">I am sure the details I provided are correct</span>
  </div>
  {/* submit button */}
  <button className="w-[60%] border-2 border-white rounded-lg p-2 bg-[#158B5E] my-6"
  onClick={TransferToken}>
  {isMethodCallLoading ? "Loading..." : "TRANSFER"}
  </button>
  </div>

}

const CompanyDashboard = () => {

  const { tokenHolderBalance } = useRecycle()
  const {recycleContract, picker_count, account_category, companyStruct} = useToken();


  const [componentToDisplay, setComponentToDisplay] = useState(0);
  const [toggleBalance, setToggleBalance] = useState(false);
  const [balance, setBalance] = useState(0);


  // function to close nav content
  const toggleCLose = () => {
      setComponentToDisplay(0);
  };

  // 
  const ToggleBalance = () => {
    if (!recycleContract) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'contract not initialized',
        confirmButtonColor:"#006D44",
        customClass: {
            icon: "font-montserrat",
            title: " font-montserrat text-[20px] text-[#000] font-[600]",
            text: "font-montserrat, text-[16px] text-[#000] font-[600]",
        }
      })
    } else  {
        setToggleBalance(!toggleBalance)
    }
}

useEffect(() => {
  console.log("company struct at dashboard => ", companyStruct);
},[])

  return <CompanyDashboardLayout active_link={"Dashboard"} dashboard_content={
    <div className=' bg-white font-montserrat border-2 border-[#ECECEC] '>

    {/* settings main content  */}
    <div className='flex flex-row w-full'>

        {/*  content header and nav items*/}
        <div className='px-4 mt-10 w-full'>
            {/* content header */}
            <h2 className='text-[#71B453] italic font-montserrat font-[400] text-[1rem]'>Welcome back!</h2>
            {/* <div className="flex flex-row ">
              <p>company name = {companyStruct[0]}</p>
              <p>minimum weight requirement = {ethers.utils.formatEther(companyStruct[1].toString())} </p>
              <p>maximum price per kg = {ethers.utils.formatEther(companyStruct[2].toString())} </p>
              <p>company status = {companyStruct[3].toString()}</p>
              
            </div> */}
            <div className='w-full flex flex-row items-center my-6'>
              <div className="flex flex-col mr-12 ">
                  {/* toggle button n balance */}
                <div className="flex flex-row justify-between items-center">
                  <img src={merchantIcon} alt="merchant-icon" />
                  <h2 className='text-primary40 font-montserrat font-[500] text-[20px] ml-4'>Balance</h2>
                  <img src={toggleBalance ? eyesOpenIcon : eyesIcon} alt="eyes-icon" className='h-4 w-4 ml-4 hover:cursor-pointer' onClick={ToggleBalance} />
                </div>
                {/* balance */}
                <h1 className='text-[#0D4D00] text-[1.6rem] font-[700] font-montserrat my-4'>{toggleBalance ? `${ethers.utils.formatEther(tokenHolderBalance)} REC` : "XXXXX"}</h1>
                {/* pickers div */}
              </div>
             
              <div className=" w-full bg-primary40 p-4 rounded-md flex flex-col text-white">
                <div className="flex flex-row justify-between items-center">
                  <img src={usersIcon} alt="users-icon"/>
                  <h2 className="text-[16px] font-[500] ">ACTIVE PICKERS</h2>
                </div>
                <h2 className="text-[24px] font-[600]">{picker_count.toString()}</h2>
              </div>
               
            </div>
            {/* settings nav items */}
            <ul className='w-full'>
            {
                CompanyDashboardData.map((item, index) =>
                    <Link to={item.user_a_link} key={index} 
                        onClick={() => setComponentToDisplay(index+1)}
                        className=' flex flex-row bg-[rgba(0, 109, 68, 0.01)] border-2 border-[#ECECEC] p-3 mb-4 items-center rounded-lg active:bg-[rgba(0, 109, 68, 0.33)]'>
                        <img src={item.icon} alt={`${item.title} icon`} className='w-[35px] h-[35px] mr-4'/>
                        <h1>{item.title}</h1>
                    </Link>
                )
            }
            </ul>
        </div>

        {/* settings display nav content */}
        <div className='w-full'>
            { 
                componentToDisplay === 1 ? <ValidatePlasticTab toggleClose={toggleCLose} />
              : componentToDisplay === 2 ? <PayPickerTab  toggleClose={toggleCLose}/> 
              : componentToDisplay === 3 ? <TransferRecyloxTab  toggleClose={toggleCLose}/> 
              : ""
            }

        </div>
    </div>
</div>
  // <CompanyTransactions />
}/>;
}

export default CompanyDashboard