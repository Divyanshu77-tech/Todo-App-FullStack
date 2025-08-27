import React from "react";

import LandingHeroLHS from "./LandingHeroLHS";
import LandingHeroRHS from "./LandingHeroRHS";
import LandingFooter from "./LandingFooter";
const LandingHero = () => {
  return (
    <main className="h-screen w-full flex flex-col">
      <div className="flex h-[85%]">
        <LandingHeroLHS />
        <LandingHeroRHS />
      </div>
      <LandingFooter />
    </main>
  );
};

export default LandingHero;
