import { useState } from 'react';
import Logo from '../../components/logo';
import { useRecycle } from '../../context/recycle';
import RegistrationHeader from '../../components/navigation/RegistrationHeader';
import { useToken } from '../../context/recylox';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';

const CompanyRegPage = () => {

  const {contract, registerCompany, isMethodCallLoading, 
    isMethodCallSuccessful, account_category }  =  useRecycle();
  const { connectedAccount } = useToken();


const [companyName, setCompanyName] = useState('')
const [minimumWeightRequirement, setMinimumWeightRequirement] = useState('');
const [maximumWeightPerKg, setMaximumWeightPerKg] = useState('');
const [isTermsChecked, setIsTermsChecked] = useState(false)

const RegisterCompany = () => {

  console.log("contract reg page => ", contract);

  if(!connectedAccount) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Connect wallet to continue',
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
  } else if (account_category !== "") {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Address aleady registered',
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
  }
  else if(!companyName) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Input company name',
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
  } 
  else if (!minimumWeightRequirement) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Input minimum weight requirement',
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
  }
  else if (!maximumWeightPerKg) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Input maximum wight per kg',
      confirmButtonColor:"#006D44",
      customClass: {
          icon: "font-montserrat",
          title: " font-montserrat text-[20px] text-[#000] font-[600]",
          text: "font-montserrat, text-[16px] text-[#000] font-[600]",
      }
    })
  }
  // else if (!isActive) {
  //   alert("Agree to Recylox Terms")
  // }
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
  }
  else {
    const minWt = ethers.utils.parseEther(minimumWeightRequirement)
    const maxPrice =ethers.utils.parseEther(maximumWeightPerKg)
    console.log("register company arguments => ", minWt, maxPrice);
    registerCompany(companyName, minWt, maxPrice, true);

  }
}


  return (
    <div className='container mx-auto'>
      <RegistrationHeader/>
      <div className='my-20 min-w-[40rem] md:w-[62rem] lg:w-[82rem] flex flex-row justify-center'>
        <div>
          <p className='text-[1rem] md:text-[2rem] lg:text-[3.7rem] font-bold text-center'>
            Company Registration Page
          </p>
          <div className='flex flex-row justify-center mt-4 '>
            <div className='relative'>
              <div className='w-[10rem] md:w-[22rem] lg:w-[29rem] min-h-[34rem] bg-[#F8F9FB] border border-primary40-700'>
                <div className='flex flex-row mt-10 ml-10'>
                  <div className='w-46 h-46 items-center '>
                    <Logo fill='#0D4D00' w='46' h='46' />
                  </div>
                  <p className='text-[1rem] md:text-[1rem] lg:text-[1.2rem] mt-2 ml-3 text-[#0D4D00]  text-center'>
                    Recylox
                  </p>
                </div>
                <div className='ml-8'>
                  <h2 className='text-[1rem] md:text-[1rem] lg:text-[1.7rem] font-bold mt-2 ml-3 text-[#0D4D00]'>
                    Registration Form
                  </h2>
                </div>
                <div className='flex flex-col items-center justify-center  absolute left-16 top-40'>
                  <div className='mb-6'>
                    <label
                      htmlFor='company-name'
                      className='block mb-1 text-[1rem] md:text-[1rem] lg:text-[1.2rem] font-medium text-[#0D4D00] text-center'
                    >
                      Company Name
                    </label>
                    <input
                      type='text'
                      className='border-b-2 w-[14rem] mx-auto focus:outline-none border-[#0D4D00] bg-transparent'
                      onChange={(nme)=> setCompanyName(nme.target.value)}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='Minimum-Weight-Requirement'
                      className='block mb-1 text-[1rem] md:text-[1rem] lg:text-[1.2rem] font-medium text-[#0D4D00] text-center'
                    >
                      Minimum Weight Requirement (Kg)
                    </label>
                    <input
                      type='number'
                      className='border-b-2 w-[14rem] flex  mx-auto  focus:outline-none border-[#0D4D00] bg-transparent'
                      onChange={(wht)=> setMinimumWeightRequirement(wht.target.value)}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='Maximum-Price-Per-Kilogram'
                      className='block mb-1 text-[1rem] md:text-[1rem] lg:text-[1.2rem] font-medium text-[#0D4D00] text-center'
                    >
                      Maximum Price (in Ether) per Kg
                    </label>
                    <input
                      type='number'
                      onChange={(pkg)=> setMaximumWeightPerKg(pkg.target.value)}
                      className='border-b-2 w-[14rem] flex mx-auto focus:outline-none border-[#0D4D00] bg-transparent'
                    />
                  </div>
                </div>
                <div className='flex flex-row items-center absolute bottom-24 left-10 flex-start'>
                  <input
                    className='h-[1.4rem] w-[4rem] border-solid border-[#0D4D00]'
                    type='checkbox'
                    value={isTermsChecked}
                    onChange={() => setIsTermsChecked(!isTermsChecked)}
                    aria-label='Checkbox for following text input'
                  />
                  <p className='text-[0.5rem] md:text-[0.7rem] lg:text-[0.7rem] mt-2 w-[14rem]  text-[#0D4D00]'>
                    I agree to the terms of the Recylox Subscriber Agreement and
                    the Privacy Policy
                  </p>
                </div>
                <button 
                  className='rounded-[6px] absolute bottom-6 left-36 py-1 px-6 text-[0.6rem] md:text-[0.8rem] lg:text-[1rem] font-medium text-[#fff] bg-[#0D4D00]'
                  onClick={RegisterCompany}>
                    {isMethodCallLoading ? "Loading..." : isMethodCallSuccessful ? "Company created" : "Register"}
                </button>
              </div>
            </div>
            <div className='w-[10rem] md:w-[16rem] lg:w-[21rem] min-h-[34rem] bg-[url(/src/assets/company-bg.svg)]  bg-contain md:bg-cover bg-right bg-no-repeat'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegPage;
