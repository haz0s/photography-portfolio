import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ConveyorBelt({ featuredWorks }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Set initial scroll position to the start of the first set (after the first copy)
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      setTimeout(() => {
        const singleListWidth = container.scrollWidth / 3;
        container.scrollLeft = singleListWidth;
      }, 0);
    }
  }, [featuredWorks]);

  // Handle infinite scroll effect
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const singleListWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= singleListWidth * 2) {
      container.scrollLeft = singleListWidth;
    }
    if (container.scrollLeft <= 0) {
      container.scrollLeft = singleListWidth;
    }
  };

  // Triple the items for seamless looping
  const tripledWorks = [...featuredWorks, ...featuredWorks, ...featuredWorks];

  return (
    <div className="relative w-full">
      {/* Conveyor Belt */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onScroll={handleScroll}
      >
        <div
          className={`flex w-max animate-conveyor-belt${
            isPaused ? " animation-paused" : ""
          }`}
          style={{ minWidth: "fit-content" }}
        >
          {tripledWorks.map((item, index) => (
            <Link
              href="/photos"
              key={index}
              className="flex-none w-80 mx-3 group cursor-pointer"
              scroll={false}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div
                      className="w-12 h-1 mb-4 transition-all duration-500"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <h3 className="text-2xl font-light text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}