import LandingNav from "./LandingNav";
import LandingHero from "./LandingHero";

const Landing = () => {
  return (
    <>
      <div
        id="cotainer"
        className="bg-[#FAF9FB] text-black px-12 py-8 min-h-screen"
      >
        <LandingNav />
        <LandingHero />
      </div>
    </>
  );
};

export default Landing;
