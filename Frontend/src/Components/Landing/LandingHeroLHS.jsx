import React from "react";

const LandingHeroLHS = () => {
  return (
    <div className="h-full w-1/2 flex flex-col items-start p-6">
      <h1 className="text-5xl font-semibold mt-8">
        <span className="block text-black">Stay Organized,</span>
        <span className="block text-black">Stay Productive</span>
      </h1>
      <p
        className="text-[#3c68a3] text-xl mt-8 font-semibold
        "
      >
        Manage your task efficiently and boost your productivity
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer mt-8">
        Get Started 
      </button>
    </div>
  );
};

export default LandingHeroLHS;
