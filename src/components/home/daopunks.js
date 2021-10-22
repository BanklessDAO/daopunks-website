import DaopunkAnon1 from "../../assets/images/nfts/1.png";
import DaopunkAnon2 from "../../assets/images/nfts/2.png";
import DaopunkAnon3 from "../../assets/images/nfts/3.png";
import DaopunkAnon4 from "../../assets/images/nfts/4.png";
import DaopunkAnon5 from "../../assets/images/nfts/5.png";
import DaopunkAnon6 from "../../assets/images/nfts/6.png";
import DaopunkAnon7 from "../../assets/images/nfts/7.png";
import DaopunkAnon8 from "../../assets/images/nfts/8.png";
import DaopunkAnon9 from "../../assets/images/nfts/9.png";

export default function DaoPunks({ showMore, setShowMore }) {
  const daopunks = !showMore
    ? [DaopunkAnon1, DaopunkAnon2, DaopunkAnon3]
    : [
        DaopunkAnon1,
        DaopunkAnon2,
        DaopunkAnon3,
        DaopunkAnon4,
        DaopunkAnon5,
        DaopunkAnon6,
        DaopunkAnon7,
        DaopunkAnon8,
        DaopunkAnon9  ,
      ];

  return (
    <>
      <div className="mt-10 md:mt-24 grid gap-5 lg:gap-10 grid-cols-1 md:grid-cols-3 place-items-center px-5 md:px-14">
        {daopunks.map((anon, key) => {
          return <img className="rounded-lg" key={key} src={anon} alt="" />;
        })}
      </div>
      <button
        className="px-10 py-5 mt-10 md:mt-24 mb-24 md:mb-44 modius-bold text-red text-lg outline-none hover:bg-gray-50 transition-all rounded-lg"
        onClick={() => setShowMore(!showMore)}
      >
        {!showMore ? "SHOW MORE" : "SHOW LESS"}
      </button>
    </>
  );
}
