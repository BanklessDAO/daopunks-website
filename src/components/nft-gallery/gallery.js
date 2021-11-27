import React from "react";

import { SearchIcon } from "@heroicons/react/solid";

export default function Gallery() {
  return (
    <div className="mt-10 w-full h-full flex flex-col items-center modius-bold">
      <div className="text-red text-4xl sm:text-5xl md:text-6xl md:py-12 text-center">
        ALL DAO PUNKS
      </div>

      <div className="flex gap-x-2">
        <div className="relative">
          <div className="absolute ml-3 -mt-2 px-2 bg-white text-sm">CODE</div>
          <input
            type="text"
            placeholder="592"
            //   value={orderId}
            className="w-full h-10 px-2 border border-black rounded outline-none  placeholder-gray-200"
            //   onInput={(e) => setOrderId(e.target.value)}
          />
        </div>
        <button className="w-10 h-10 bg-black rounded flex items-center justify-center">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
