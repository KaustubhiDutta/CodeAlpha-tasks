import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Globe, ChevronDown, X } from 'lucide-react';
import { useDestinationSearch } from '../../hooks/useDestinationSearch';
import { countries } from '../../data/countries';
import { indianStates } from '../../data/indianStates';

const DestinationSelector = ({ selectedCountry, onSelectCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef(null);
  const { activeTab, setActiveTab, filteredDestinations, searchQuery, setSearchQuery } = useDestinationSearch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchInput('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (destination) => {
    onSelectCountry({
      code: destination.code,
      name: destination.name,
      flag: destination.flag,
      language: destination.language,
      type: destination.type,
      region: destination.region || destination.continent
    });
    setIsOpen(false);
    setSearchInput('');
    setSearchQuery('');
  };

  const getDisplayLocation = () => {
    if (!selectedCountry) return null;
    const isState = indianStates.some(s => s.code === selectedCountry.code);
    return (
      <div className="flex items-center gap-2">
        <span className="text-2xl">{selectedCountry.flag}</span>
        <div>
          <div className="font-medium">{selectedCountry.name}</div>
          <div className="text-xs text-gray-400">
            {isState ? 'Indian State' : 'Country'} → {selectedCountry.language?.toUpperCase()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-2xl flex items-center justify-between hover:border-sky-400 transition-all duration-200"
      >
        {selectedCountry ? (
          getDisplayLocation()
        ) : (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Where are you traveling to?</span>
          </div>
        )}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or Indian state..."
                  className="w-full pl-9 pr-8 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl border-0 focus:ring-2 focus:ring-sky-400 text-sm"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('countries')}
                className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === 'countries' 
                    ? 'text-sky-500' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <Globe className="w-4 h-4" />
                  Countries
                </div>
                {activeTab === 'countries' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-teal-500"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('states')}
                className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
                  activeTab === 'states' 
                    ? 'text-teal-500' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Indian States
                </div>
                {activeTab === 'states' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500"
                  />
                )}
              </button>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredDestinations.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No destinations found</p>
                  <p className="text-xs mt-1">Try searching for a country or Indian state</p>
                </div>
              ) : (
                filteredDestinations.map((dest, idx) => (
                  <motion.button
                    key={`${dest.type}-${dest.code}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => handleSelect(dest)}
                    className="w-full p-3 text-left hover:bg-gradient-to-r hover:from-sky-50 hover:to-teal-50 dark:hover:from-gray-800 dark:hover:to-gray-800 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{dest.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                          {dest.name}
                          {dest.type === 'state' && (
                            <span className="text-xs text-gray-400 ml-2">(India)</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {dest.type === 'country' ? dest.continent : dest.region}
                          {' • '}
                          <span className="text-teal-500">{dest.language.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-white transition-colors">
                        {dest.language.toUpperCase()}
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-[10px] text-center text-gray-400">
                {filteredDestinations.length} destinations available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationSelector;