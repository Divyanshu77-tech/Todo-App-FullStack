import React from "react";
import { Link } from "react-router-dom";
import LandingNavLogo from "./LandingNavLogo";

const LandingNav = () => {
  return (
    <header className="w-full h-[80px] flex items-center justify-between font-bold bg-transparent border border-[rgba(45,45,45,0.1)] rounded-xl p-2">
      <LandingNavLogo />
      <nav className="flex gap-8 mr-3">
        <Link className="text-[1.1rem] font-semibold text-gray-700 hover:text-gray-950 transition-all duration-200" to="/signup">
          Signup{" "}
        </Link>
        <Link className="text-[1.1rem] font-semibold text-gray-700 hover:text-gray-950 transition-all duration-200" to="/features">
          Features
        </Link>
        <Link className="text-[1.1rem] font-semibold text-gray-700 hover:text-gray-950 transition-all duration-200" to="/contact">
          Contact
        </Link>
        <Link className="text-[1.1rem] font-semibold text-gray-700 hover:text-gray-950 transition-all duration-200" to="/about">
          About
        </Link>
      </nav>
    </header>
  );
};

export default LandingNav;
