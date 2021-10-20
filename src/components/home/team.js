import BackgroundImage from "../../assets/images/backgrounds/team-background.png";
import CryptoBushi from "../../assets/images/team/crypto-bushi.png";
import Sinjun from "../../assets/images/team/sinjun.png";
import Bankless from "../../assets/images/team/bankless.png";
import Floc from "../../assets/images/team/floc.png";

const team = [
  {
    image: CryptoBushi,
    name: "CRYPTO BUSHI",
    title: "ARTIST",
    twitterHandle: "@thecryptobushi",
    twitterURL: "https://twitter.com/thecryptobushi",
  },
  {
    image: Sinjun,
    name: "SINJUN",
    title: "FASHION",
    twitterHandle: "@SinjunART",
    twitterURL: "https://twitter.com/SinjunART",
  },
  {
    image: Bankless,
    name: "BANKLESS DAO",
    title: "PARTNER",
    twitterHandle: "@banklessDAO",
    twitterURL: "https://twitter.com/banklessDAO",
  },
  {
    image: Floc,
    name: "FLOC*",
    title: "DESIGN",
    twitterHandle: "@wearefloc",
    twitterURL: "https://twitter.com/wearefloc",
  },
];

export default function Team() {
  return (
    <div
      id="team"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${BackgroundImage})`,
      }}
      className="w-screen h-max bg-cover flex flex-col items-center"
    >
      <h1 className="mx-20 mt-10 lg:mt-40 md:mt-32 text-white red-text-shadow modius-bold text-5xl md:text-7xl text-center">
        MEET THE TEAM
      </h1>

      <div className="my-24 mx-10 lg:my-36 lg:mt-48 flex flex-col xl:flex-row gap-y-10 ">
        {team.map((member, key) => {
          return (
            <div
              className="w-11/12 sm:max-w-sm xl:w-60 2xl:w-72 flex flex-col items-center mx-5"
              key={key}
            >
              <img src={member.image} alt="" />
              <div className="mt-8 open-sans-bold text-lg text-white text-center">
                {member.title}
              </div>
              <div
                style={{ maxWidth: "15rem" }}
                className="modius-bold text-3xl text-white text-center"
              >
                {member.name}
              </div>
              <a
                style={{ maxWidth: "15rem" }}
                className="mt-6 max-w-xs open-sans text-xl text-white text-center"
                href={member.twitterURL}
                target="_blank"
                rel="noreferrer"
              >
                {member.twitterHandle}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
