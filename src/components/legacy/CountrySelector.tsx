import { useMemo, useCallback } from 'react';
import { PACIFIC_COUNTRIES } from '../../data/chartData';

interface CountrySelectorProps {
  selectedCountries: string[];
  onCountriesChange: (countries: string[]) => void;
  className?: string;
}

const COUNTRY_NAMES: Record<string, string> = {
  'CK': 'Cook Islands', 'FJ': 'Fiji', 'FM': 'Micronesia', 'KI': 'Kiribati',
  'MH': 'Marshall Islands', 'NC': 'New Caledonia', 'NR': 'Nauru', 'NU': 'Niue',
  'PF': 'French Polynesia', 'PG': 'Papua New Guinea', 'PW': 'Palau', 'SB': 'Solomon Islands',
  'TO': 'Tonga', 'TV': 'Tuvalu', 'VU': 'Vanuatu', 'WS': 'Samoa'
};

function CountrySelector({ selectedCountries, onCountriesChange, className = '' }: CountrySelectorProps) {

  const isAllSelected = useMemo(() => 
    selectedCountries.length === PACIFIC_COUNTRIES.length, 
    [selectedCountries]
  );

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      onCountriesChange([]);
    } else {
      onCountriesChange([...PACIFIC_COUNTRIES]);
    }
  }, [isAllSelected, onCountriesChange]);

  const handleCountryToggle = useCallback((countryCode: string) => {
    if (selectedCountries.includes(countryCode)) {
      onCountriesChange(selectedCountries.filter(c => c !== countryCode));
    } else {
      onCountriesChange([...selectedCountries, countryCode]);
    }
  }, [selectedCountries, onCountriesChange]);

  return (
    <div className={`p-3 bg-white rounded border ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          Pacific Countries ({selectedCountries.length}/{PACIFIC_COUNTRIES.length})
        </span>
        <button
          onClick={handleSelectAll}
          className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded text-blue-700"
          type="button"
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {PACIFIC_COUNTRIES.map(countryCode => (
          <label 
            key={countryCode} 
            className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded"
          >
            <input
              type="checkbox"
              checked={selectedCountries.includes(countryCode)}
              onChange={() => handleCountryToggle(countryCode)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-xs">
              <strong>{countryCode}</strong>
              <br />
              <span className="text-gray-600">{COUNTRY_NAMES[countryCode]}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CountrySelector;
