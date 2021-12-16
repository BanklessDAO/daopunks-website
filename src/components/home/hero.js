import BackgroundImage from "../../assets/images/backgrounds/hero-background.png";
import HeroImage from "../../assets/images/hero/hero-image.png";

import Header from "../global/header";

export default function Hero() {
  return (
    <div
      id="#"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${BackgroundImage})`,
      }}
      className="w-screen h-screen bg-cover flex flex-col"
    >
      <Header />
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full lg:max-w-5xl flex flex-col xl:flex-row-reverse items-center justify-between mb-10">
          <div
            style={{
              backgroundImage: `url(${HeroImage})`,
              backgroundSize: "auto 90%",
            }}
            className="w-full xl:max-w-sm xl:-mt-16 max-h-38 h-full bg-no-repeat bg-center bg-contain"
          >
            <div className="block xl:hidden w-full h-full flex flex-col xl:flex-row items-center justify-end md:justify-center text-center text-white px-5 pb-10 sm:pb-20">
              <div className="md:max-w-xl">
                <div className="modius-bold text-4xl sm:text-6xl md:text-5xl">
                  We BLAZE TRAILS. <br />
                  WE BUILD BRIDGES.
                </div>
                <div className="modius text-2xl sm:text-3xl px-5 sm:px-10">
                  A BETTER WORLD AWAITS DAOPUNKS LEAD THE WAY
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex w-full h-full flex-col justify-center text-left text-white px-5 pb-10 sm:pb-20">
            <div className="md:max-w-xl">
              <div className="modius-bold text-5xl">
                We BLAZE TRAILS. <br /> WE BUILD BRIDGES.
              </div>
              <div
                style={{ fontSize: "2.5rem", lineHeight: "2.8rem" }}
                className="modius max-w-md"
              >
                A BETTER WORLD AWAITS DAOPUNKS LEAD THE WAY
              </div>
            </div>
            <a
              href="#mint"
              className="hidden md:block w-max px-8 mt-5 py-5 rounded red text-white modius-bold text-xl leading-snug text-black outline-none cursor-pointer"
            >
              MINT A DAOPUNK
            </a>
          </div>
          <button
            onClick={() => {
              window.location.href = "#mint";
            }}
            className="xl:hidden w-2/3 sm:w-max px-3 sm:px-10 mx-5 py-5 mb-10 rounded bg-white modius-bold text-sm sm:text-xl leading-snug text-black outline-none"
          >
            CONNECT YOUR WALLET
          </button>
        </div>
      </div>
    </div>
  );
}
