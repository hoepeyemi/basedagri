import Header from "../components/navigation/Header"
import howItWorksImage from '../assets/how_it_works.png';
import HomeFooter from "../components/homepage_components/HomeFooter";
import Footer from "../components/footer";


const HowItWorks = () => {
  return (
    <>
        <Header/>
        <div className="flex flex-col md:flex-row font-montserrat bg-howItWorksBg px-20 mt-20">
          {/* header */}
            <div className=" flex flex-col items-center text-center justify-center">
                <h1 className="text-[2.5rem] font-[800] text-white">HOW IT WORKS</h1>
                <h1 className="text-primary40 bg-white text-[2rem] font-[600] mt-4">Recycling and Earning with Basearpsagric</h1>
            </div>
            <img src={howItWorksImage} alt="how-it-works image"
                className="h-[28rem] w-[29rem]"
            />
        </div>
        <p className="w-[80%] py-10 mx-auto md:w-[60%] md:py-20  ">
          Our organization promotes flexible and stress free process 
          for participants to get entitled to token rewards while they 
          participate in our program. All you need to to follow the 
          steps outlined below:
        <ul className=" list-decimal list-inside">
          <li className="mt-4">
            Collect Waste Plastics: Anyone can participate by 
            collecting waste plastics from their surroundings. 
            This can include household plastics, packaging materials, 
            and other plastic waste that would otherwise end up in 
            landfills or pollute our oceans.
          </li>
          <li className="mt-4">
            Deposit and Verify: Once you've collected a 
            sufficient amount of waste plastics, you can 
            deposit them through our platform. Our 
            verification process ensures the authenticity 
            and quality of the plastics collected, guaranteeing 
            fair compensation
          </li>
          <li className="mt-4">
            Earn Tokens: Upon successful verification, 
            you will be rewarded with tokens based on the 
            weight and type of plastics deposited. These 
            tokens can be used within our platform ecosystem, 
            offering various benefits such as discounts on sustainable 
            products or even exchanged for other cryptocurrencies.
          </li>
          <li className="mt-4">
            Recycling Partnerships: We have partnered with renowned plastic 
            recycling companies that purchase the deposited plastics 
            from our platform. These companies utilize advanced 
            recycling technologies to transform waste plastics 
            into new materials, reducing the need for virgin plastics 
            and minimizing environmental impact.
          </li>
        </ul>
        </p>
        <HomeFooter/>
        <Footer/>
    </>
  )
}

export default HowItWorks