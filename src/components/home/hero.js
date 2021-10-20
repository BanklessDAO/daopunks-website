/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import BackgroundImage from "../../assets/images/backgrounds/hero-background.png";
import Logo from "../../assets/images/hero/logo.png";
import HamburgerIcon from "../../assets/images/hero/hamburger-icon.png";
import HeroImage from "../../assets/images/hero/hero-image.png";
import Sidebar from "./sidebar";

import Twitter from "../../assets/images/sidebar/twitter.png";
import Discord from "../../assets/images/sidebar/discord.png";

export default function Hero() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      id="#"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${BackgroundImage})`,
      }}
      className="w-screen h-screen bg-cover flex flex-col"
    >
      {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : null}
      <div className="w-full p-8 pb-0 sm:p-10 lg:p-14 flex items-center justify-between">
        <img className="w-32 md:w-36 lg:w-40" src={Logo} alt="" />
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="block md:hidden w-10 h-10 -mt-3 mr-1 outline flex items-center justify-center"
        >
          <img className="w-10" src={HamburgerIcon} alt="" />
        </div>
        <div className="hidden xl:flex modius-bold text-white text-lg gap-x-2 2xl:gap-x-6">
          <a to="#about" href="#about" className="text-hover-red">
            About
          </a>
          /
          <a href="#mint" className="text-hover-red">
            Mint
          </a>
          /
          <a href="#roadmap" className="text-hover-red">
            Roadmap
          </a>
          /
          <a href="#team" className="text-hover-red">
            Team
          </a>
          /
          <a
            href="https://twitter.com/DAOpunksNFT"
            target="_blank"
            className="text-hover-red"
          >
            Contact
          </a>
        </div>
        <div className="hidden md:flex -mt-1 items-center justify-center gap-x-10">
          <div className="flex gap-x-6">
            <a href="https://twitter.com/DAOpunksNFT" target="_blank">
              <img src={Twitter} alt="" />
            </a>
            <a href="https://t.co/sbisMPDiJy?amp=1" target="_blank">
              <img src={Discord} alt="" />
            </a>
          </div>
          <a href="#mint" className="px-3 sm:px-7 py-5 rounded bg-black text-white modius-bold text-base sm:text-xl leading-snug text-black outline-none">
            CONNECT
          </a>
        </div>
      </div>

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
              <div className="modius-bold text-6xl">
                We BLAZE TRAILS. <br /> WE BUILD BRIDGES.
              </div>
              <div className="modius text-5xl">
                A BETTER WORLD AWAITS DAOPUNKS LEAD THE WAY
              </div>
            </div>
            <a
              href="#mint"
              className="hidden md:block w-max px-10 mt-5 py-5 rounded red text-white modius-bold text-xl leading-snug text-black outline-none cursor-pointer"
            >
              MINT A DAOPUNK
            </a>
          </div>
          <button className="block xl:hidden w-2/3 sm:w-max px-3 sm:px-10 mx-5 py-5 mb-10 rounded bg-white modius-bold text-sm sm:text-xl leading-snug text-black outline-none">
            CONNECT YOUR WALLET
          </button>
        </div>
      </div>
    </div>
  );
}
