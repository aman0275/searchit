import React from 'react';
import './SearchInput.css';

export const SearchInput = ({ value, onChange, onSearch, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search by name or SSN..."
        className="search-input"
        disabled={isLoading}
      />
      <button 
        onClick={onSearch} 
        className={`search-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <i className="fas fa-search"></i>
        )}
      </button>
    </div>
  );
}; 