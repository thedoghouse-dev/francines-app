import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import WordSearch from './components/WordSearch';
import SchnauzzerGallery from './components/SchnauzzerGallery';
import MemoryMatch from './components/MemoryMatch';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'wordSearch':
        return <WordSearch onExit={() => setCurrentView('dashboard')} />;
      case 'gallery':
        return <SchnauzzerGallery onExit={() => setCurrentView('dashboard')} />;
      case 'memoryMatch':
        return <MemoryMatch onExit={() => setCurrentView('dashboard')} />;
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
