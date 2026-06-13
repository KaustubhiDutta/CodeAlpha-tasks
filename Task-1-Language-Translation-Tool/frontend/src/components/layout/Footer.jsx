import React from 'react';
import { Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Compass className="w-4 h-4" />
            <span>TravelTalk — Pack your passport, wander freely.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-teal-400 transition-colors">About</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Languages</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;