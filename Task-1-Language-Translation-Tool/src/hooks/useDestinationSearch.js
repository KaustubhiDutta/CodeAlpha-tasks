import { useState, useMemo } from 'react';
import { countries } from '../data/countries';
import { indianStates } from '../data/indianStates';

export const useDestinationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('countries'); // 'countries' or 'states'

  const allDestinations = useMemo(() => {
    const countriesList = countries.map(c => ({
      ...c,
      type: 'country',
      displayName: c.name,
      searchTerms: `${c.name} ${c.language} ${c.continent}`
    }));
    
    const statesList = indianStates.map(s => ({
      ...s,
      type: 'state',
      displayName: `${s.name} (India)`,
      searchTerms: `${s.name} ${s.language} ${s.region} India state`
    }));
    
    return [...countriesList, ...statesList];
  }, []);

  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) {
      // Return popular destinations when no search
      return allDestinations.filter(d => 
        d.type === activeTab && (
          (d.type === 'country' && ['jp', 'fr', 'it', 'es', 'th', 'us'].includes(d.code)) ||
          (d.type === 'state' && ['wb', 'tn', 'kl', 'mh', 'ka', 'gj'].includes(d.code))
        )
      );
    }
    
    const query = searchQuery.toLowerCase();
    return allDestinations.filter(d => 
      d.type === activeTab && d.searchTerms.toLowerCase().includes(query)
    );
  }, [searchQuery, activeTab, allDestinations]);

  const getLanguageFromDestination = (destination) => {
    if (destination.type === 'country') {
      return destination.language;
    } else {
      return destination.language;
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredDestinations,
    getLanguageFromDestination,
    allDestinations
  };
};