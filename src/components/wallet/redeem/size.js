export default function Size({ size, setSize }) {
  const sizes = ["S", "M", "L", "XL", "2XL"];

  return (
    <div className="w-full mt-10 grid grid-cols-3 gap-x-3 gap-y-3 px-10 lg:px-0">
      {sizes.map((teeSize, key) => (
        <button
          key={key}
          onClick={() => setSize(teeSize)}
          className={`ibm-plex border border-black	px-6 py-2 rounded-full hover:text-white hover:bg-black ${
            teeSize === size ? "bg-black text-white" : "bg-white"
          }`}
        >
          {teeSize}
        </button>
      ))}
    </div>
  );
}
