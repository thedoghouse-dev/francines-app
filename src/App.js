import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import Dashboard from './components/Dashboard';
import WordSearch from './components/WordSearch';
import MemoryMatch from './components/MemoryMatch';
import Solitaire from './components/Solitaire';
import About from './components/About';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize('G-MNGWTM1XE3');
    // Track initial page view
    ReactGA.send({ hitType: 'pageview', page: '/dashboard', title: 'Dashboard' });
  }, []);

  // Track page views when view changes
  useEffect(() => {
    const pageMap = {
      dashboard: { page: '/dashboard', title: 'Dashboard' },
      wordSearch: { page: '/word-search', title: 'Word Search' },
      memoryMatch: { page: '/memory-match', title: 'Memory Match' },
      solitaire: { page: '/solitaire', title: 'Solitaire' },
      about: { page: '/about', title: 'About' }
    };

    const pageData = pageMap[currentView];
    if (pageData) {
      ReactGA.send({ hitType: 'pageview', page: pageData.page, title: pageData.title });
    }
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'wordSearch':
        return <WordSearch onExit={() => setCurrentView('dashboard')} />;
      case 'memoryMatch':
        return <MemoryMatch onExit={() => setCurrentView('dashboard')} />;
      case 'solitaire':
        return <Solitaire onExit={() => setCurrentView('dashboard')} />;
      case 'about':
        return <About onNavigate={setCurrentView} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-warm-cream">
      {renderView()}
    </div>
  );
}

export default App;
