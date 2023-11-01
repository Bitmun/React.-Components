import React, { ChangeEvent, useState } from 'react';
import './styles.css';

type SearchProps = {
  handleData: (bySearch: boolean, inputValue: string) => void;
};

const Search: React.FC<SearchProps> = ({ handleData }) => {
  const [inputValue, setInputValue] = useState(
    localStorage?.getItem('lastInput') || ''
  );
  const handleClick = async () => {
    const input = inputValue.trim();
    localStorage.setItem('lastInput', input);
    handleData(true, input);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  return (
    <header className="header">
      <div className="searchWrapper">
        <input
          className="searchInput"
          onChange={handleChange}
          placeholder="Search..."
          value={inputValue}
        />
        <button className="searchButton" onClick={handleClick}>
          Search
        </button>
      </div>
    </header>
  );
};

export default Search;
