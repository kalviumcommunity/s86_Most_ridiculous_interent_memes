import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MemeCard from './components/MemeCard';
import MemeList from './components/MemeList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Route for Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for MemeCard */}
          <Route path="/memecard" element={<MemeCard />} />

          {/* Route for MemeList */}
          <Route path="/memelist" element={<MemeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
