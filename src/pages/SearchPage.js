import React, { useState, useEffect } from 'react';
import { SearchInput } from '../components/atoms/SearchInput/SearchInput';
import { UserCard } from '../components/molecules/UserCard/UserCard';
import { searchUsers } from '../services/userService';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchUsers(searchTerm);
        setSearchResults(results);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Debounce search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>User Search</h1>
        <SearchInput 
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="results-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          searchResults.length === 0 && searchTerm.length >= 3 ? (
            <div className="no-results">No users found</div>
          ) : (
            searchResults.map(user => (
              <UserCard key={user.id} user={user} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage; 