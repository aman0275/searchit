import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import LoadingSpinner from './components/atoms/LoadingSpinner/LoadingSpinner';
import './App.css';
import SearchPage from './pages/SearchPage';
import UserDetailsPage from './pages/UserDetailsPage';

function App() {
  return (
    <ChakraProvider resetCSS={true}>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/user/:userId" element={<UserDetailsPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
