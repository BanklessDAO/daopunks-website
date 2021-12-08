import React, { useState } from "react";
import Logo from "../../assets/images/hero/logo.png";
import HamburgerIcon from "../../assets/images/hero/hamburger-icon.png";
import Sidebar from "./sidebar";

import Twitter from "../../assets/images/sidebar/twitter.png";
import Discord from "../../assets/images/sidebar/discord.png";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : null}
      <div className="w-full p-8 pb-0 sm:p-10 lg:p-10 flex items-center justify-between">
        <img
          className="w-32 md:w-36 lg:w-40 cursor-pointer"
          src={Logo}
          alt=""
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="block md:hidden w-10 h-full -mt-3 mr-1 outline flex items-center justify-center"
        >
          <img className="w-10" src={HamburgerIcon} alt="" />
        </div>
        <div className="hidden lg:flex modius-bold text-white text-lg gap-x-2 2xl:gap-x-6">
          {/* <a to="#about" href="#about" className="text-hover-red">
            About
          </a>
          / */}
          {/* <a href="#mint" className="text-hover-red">
            Mint
          </a>
          / */}
          <a href="#roadmap" className="text-hover-red">
            Roadmap
          </a>
          /
          <a href="#team" className="text-hover-red">
            Team
          </a>
          /
          <a href="/my-dao-punks" className="text-hover-red">
            Redeem Shirt
          </a>
          /
          <a
            href="https://twitter.com/DAOpunksNFT"
            target="_blank"
            className="text-hover-red"
            rel="noreferrer"
          >
            Contact
          </a>
        </div>
        <div className="hidden md:flex -mt-1 items-center justify-center gap-x-10 pr-3 sm:pr-7">
          <div className="flex gap-x-6">
            <a
              href="https://twitter.com/DAOpunksNFT"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Twitter} alt="" />
            </a>
            <a
              href="https://t.co/sbisMPDiJy?amp=1"
              target="_blank"
              rel="noreferrer"
            >
              <img src={Discord} alt="" />
            </a>
          </div>
          {/* <a
            href="#mint"
            className="flex items-center justify-center px-3 sm:px-7 py-5 rounded bg-black text-white modius-bold text-base sm:text-xl leading-snug text-black outline-none"
          >
            CONNECT
          </a> */}
        </div>
      </div>
    </>
  );
}
