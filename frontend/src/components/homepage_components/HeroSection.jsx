import React from "react";
import heroImage from "../../assets/home-bgg.png";
import MediumButton from "../buttons/mediumButton";

const Hero = () => {
  return (
    <>
      <section className="container mx-auto h-full border-t-2 mt-20 bg-white font-montserrat">
        <div className="mt-10 md:mt-20 pb-20 mx-auto bg-herobg lg:bg-contain bg-no-repeat sm:bg-right">
          <div className="flex flex-col lg:flex-row w-[90%] max-w-[90%] mx-auto justify-between items-center">
            <div className="flex flex-col lg:w-[60%] text-center items-center lg:items-start lg:text-left">
              <h2 className="text-3xl md:text-[45px] font-[800] md:leading-[90px] tracking-[1px]">
                BASEARPSAGRIC
              </h2>
              <h2 className="text-4xl md:text-[60px] tracking-[1px] font-black text-[#000000]">
                FARMS
              </h2>
              <p className="w-[275px] font-bold text-base md:text-[20px] tracking-[-0.5px] leading-[25px] mt-6">
                Turn Farm Produce into Cash: Sell your harvest, Earn Rewards, and Grow financially
              </p>
              <p className="text-sm md:text-[16px] leading-[25px] mt-5 font-semibold tracking-[-0.5px] lg:w-[420px] xl:w-[566px]">
                Basearpsagric is a groundbreaking digital currency specifically
                designed to revolutionize the world of farming. Built on the
                principles of blockchain technology.
              </p>
              <p className="text-sm md:text-[16px] leading-[25px] mt-5 font-semibold tracking-[-0.5px] lg:w-[420px] xl:w-[566px]">
                With Basearpsagric, every time you farm, you earn tokens that hold
                real-world value. 
              </p>
              <MediumButton text={"Learn more"} linkto={"/about-us"} />
            </div>

            <div className="lg:w-[35%] ml-auto">
              <img 
                src={heroImage} 
                alt="home-img" 
                className="w-full object-contain max-w-md ml-auto" 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;