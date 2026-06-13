import React, { useState, useEffect } from 'react';   
import { motion} from 'framer-motion';
import { Search, X, MapPinned } from "lucide-react";


import {
  allDestinations
} from "../../data/destinations";

const destinations = allDestinations;

const DestinationGrid = ({ selectedDestination, onSelectDestination }) => {
  const [searchQuery, setSearchQuery] = useState('');

const placeholderHints = [
  "Search Tokyo / Paralympics...",
  "Search Maharashtra, West Bengal...",
  "Search Japan, France, USA...",
  "Search Indian states or countries..."
];

const [hintIndex, setHintIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setHintIndex((prev) => (prev + 1) % placeholderHints.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);

  const filteredDestinations = destinations.filter((dest) => {
  const q = searchQuery.toLowerCase();

  const city = dest.city?.toLowerCase() || "";
  const country = dest.country?.toLowerCase() || "";
  const language = dest.language?.toLowerCase() || "";

  return (
  city.includes(q) ||
  country.includes(q) ||
  language.includes(q)
);
});

  return (
  <div className="max-w-6xl mx-auto w-full">

    {/* HEADER TITLE (NEW) */}
    

      {/* Search Bar */}
     {/* Search Heading */}
<div className="max-w-5xl mx-auto mb-2">

  <div className="flex items-center justify-between">
    
    <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight">
      Where are you travelling to?
    </h2>

    <MapPinned
      className="w-8 h-8 text-cyan-400"
      strokeWidth={2.5}
    />

  </div>

  <p className="text-gray-400 text-sm mt-1">
    Choose a destination and start speaking like a local
  </p>

</div>

{/* Search Bar */}
<div className="relative mb-10 max-w-5xl mx-auto">

  <div className="relative">

    {/* INPUT */}
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder={placeholderHints[hintIndex]}
      className="
        w-full
        px-5
        py-4
        pr-12
        rounded-2xl
        text-white
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-teal-400/50
        transition-all
      "
    />

    {/* ✨ Animated Placeholder */}
    

    {/* Clear button */}
    {searchQuery && (
      <button
        onClick={() => setSearchQuery("")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
      >
        ✕
      </button>
    )}

  </div>
</div>

      {/* Selected Destination Display */}
     


      {/* Destination Grid */}
     <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {filteredDestinations
  .slice(0, searchQuery ? 1000 : 8)
  .map((dest) => (
          <motion.button
  key={dest.id}
  whileHover={{
  y: -8,
  scale: 1.03
}}



 whileTap={{ scale: 0.98 }}
  onClick={() => {

  onSelectDestination(dest);

  localStorage.setItem(
    "favoriteDestination",
    JSON.stringify(dest)
  );

}}
  className={`group relative w-full max-w-[210px] overflow-hidden rounded-2xl border transition-all duration-300 ${
    selectedDestination?.id === dest.id
      ? "border-teal-500 ring-2 ring-teal-500/40"
      : "border-gray-700 hover:border-gray-500"
  }`}
>

  {/* IMAGE */}
<div className="relative h-52 w-full overflow-hidden rounded-2xl">
  <img
    src={dest.image}
    alt={dest.name}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

  {/* Flag */}
  <span className="absolute right-3 top-3 text-2xl">
    {dest.flag}
  </span>

  {/* Selected Badge */}
  {selectedDestination?.id === dest.id && (
    <span className="absolute left-3 top-3 bg-teal-500 text-black text-[10px] px-2 py-1 rounded-full font-bold">
      Selected
    </span>
  )}
</div>


  {/* TEXT */}
  {/* TEXT */}
<div className="absolute bottom-5 left-5 right-5">

  <p className="text-xs text-gray-300 uppercase tracking-widest">
    {dest.country}
  </p>

  <h3 className="text-3xl font-bold text-white">
    {dest.city || dest.name}
  </h3>

  <p className="text-sm text-orange-300 mt-2">
    🔊 {dest.greeting}
    <span className="text-gray-300 ml-2">
      • {dest.languageName}
    </span>
  </p>

</div>

</motion.button>
        ))}
      </div>

       <div className="h-10"></div>

    </div>
  );
};

export default DestinationGrid;