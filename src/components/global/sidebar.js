/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import BackgroundImage from "../../assets/images/backgrounds/hero-background.png";
import Cross from "../../assets/images/hero/close.png";
import Twitter from "../../assets/images/sidebar/twitter.png";
import Discord from "../../assets/images/sidebar/discord.png";
export default function Sidebar({ setShowSidebar }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${BackgroundImage})`,
      }}
      className="absolute z-50 w-screen h-screen bg-cover"
    >
      <div className="w-full p-8 flex items-center justify-end">
        <div
          onClick={() => setShowSidebar(false)}
          className="w-10 h-10 mt-3.5 mr-2 outline flex items-center justify-end"
        >
          <img className="w-10" src={Cross} alt="" />
        </div>
      </div>

      <div className="absolute left-0 bottom-0 pl-8 pb-20 flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-5 text-white modius-bold text-2xl">
          <a href="/#mint" className="text-hover-red">
            Mint
          </a>
          <a href="/#roadmap" className="text-hover-red">
            Roadmap
          </a>
          <a href="/#team" className="text-hover-red">
            Team
          </a>
          <a href="/redeem" className="text-hover-red">
            Redeem Shirt
          </a>
          <a href="/gallery" className="text-hover-red">
            Search
          </a>
          <a
            href="https://twitter.com/DAOpunksNFT"
            target="_blank"
            className="text-hover-red"
            rel="noreferrer"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-x-8">
          <a href="https://twitter.com/DAOpunksNFT" target="_blank">
            <img src={Twitter} alt="" />
          </a>
          <a href="https://discord.gg/daopunks" target="_blank">
            <img src={Discord} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}
