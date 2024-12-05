import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/atoms/LoadingSpinner/LoadingSpinner';
import './App.css';

// Lazy load page components
const SearchPage = lazy(() => import('./pages/SearchPage').then(module => ({ default: module.default })));
const UserDetailsPage = lazy(() => import('./pages/UserDetailsPage').then(module => ({ default: module.default })));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:id" element={<UserDetailsPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
