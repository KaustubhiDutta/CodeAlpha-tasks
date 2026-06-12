export const languageNames = {
  'en': 'English',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'ko': 'Korean',
  'hi': 'Hindi',
  'ar': 'Arabic',
  'tr': 'Turkish',
  'nl': 'Dutch',
  'pl': 'Polish',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'id': 'Indonesian',
  'el': 'Greek'
};

export const getLanguageName = (code) => {
  return languageNames[code] || code.toUpperCase();
};

export const getCountryFromLanguage = (languageCode) => {
  const countryMap = {
    'ja': { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    'fr': { code: 'fr', name: 'France', flag: '🇫🇷' },
    'de': { code: 'de', name: 'Germany', flag: '🇩🇪' },
    'es': { code: 'es', name: 'Spain', flag: '🇪🇸' },
    'it': { code: 'it', name: 'Italy', flag: '🇮🇹' },
    'pt': { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
    'ru': { code: 'ru', name: 'Russia', flag: '🇷🇺' },
    'zh': { code: 'cn', name: 'China', flag: '🇨🇳' },
    'ko': { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
    'hi': { code: 'in', name: 'India', flag: '🇮🇳' },
    'ar': { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
    'tr': { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
    'th': { code: 'th', name: 'Thailand', flag: '🇹🇭' },
    'vi': { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
    'el': { code: 'gr', name: 'Greece', flag: '🇬🇷' }
  };
  
  return countryMap[languageCode] || null;
};