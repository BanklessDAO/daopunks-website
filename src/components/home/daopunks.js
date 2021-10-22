import DaopunkAnon1 from "../../assets/images/nfts/1.jpg";
import DaopunkAnon2 from "../../assets/images/nfts/2.jpg";
import DaopunkAnon3 from "../../assets/images/nfts/3.jpg";
import DaopunkAnon4 from "../../assets/images/nfts/4.jpg";
import DaopunkAnon5 from "../../assets/images/nfts/5.jpg";
import DaopunkAnon6 from "../../assets/images/nfts/6.jpg";
import DaopunkAnon7 from "../../assets/images/nfts/7.jpg";
import DaopunkAnon8 from "../../assets/images/nfts/8.jpg";
import DaopunkAnon9 from "../../assets/images/nfts/9.jpg";

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
