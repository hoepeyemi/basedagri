import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="container mx-auto font-montserrat">
      
      {/* border text content */}
      <div className="relative flex flex-col p-4 w-full justify-center bg-white md:flex-row">
        <p className=" text-sm font-neutral font-extralight text-center md:text-base">
          Copyright 2023 RECYLOX | All Rights Reserved
        </p>
        <div>
          <Link to="/privacy-policy" 
            className="absolute text-sm font-neutral font-extralight hover:underline cursor-pointer text-center right-8 md:base md:text-left">
            {/* absolute left-[53%] -translate-x-1/2  md:left-[85%] */}
            Privacy Policy
          </Link>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
