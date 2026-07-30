import React, { useState } from "react";
import sriLankaLocations from "../data/sriLankaLocations";
import './LocationAutocomplete.css';

export default function LocationAutocomplete({ label, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const input = e.target.value;
    onChange(input);

    const filtered = sriLankaLocations.filter((loc) =>
      loc.toLowerCase().startsWith(input.toLowerCase())
    );
    setSuggestions(input ? filtered : []);
  };

  const handleSelect = (location) => {
    onChange(location);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-wrapper">
      <label>{label}</label>
      <input type="text" value={value} onChange={handleInput} placeholder="Start typing..." />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((loc) => (
            <li key={loc} onClick={() => handleSelect(loc)}>
              {loc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}