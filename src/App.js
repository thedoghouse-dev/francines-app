import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import Dashboard from './components/Dashboard';
import WordSearch from './components/WordSearch';
import MemoryMatch from './components/MemoryMatch';
import Solitaire from './components/Solitaire';
import MahjonggSolitaire from './components/MahjonggSolitaire';
import Sudoku from './components/Sudoku';
import JigsawPuzzle from './components/JigsawPuzzle';
import About from './components/About';
import { usePageTracking } from './hooks/usePageTracking';

function AppContent() {
  // Automatically track page views on route changes
  usePageTracking();

  return (
    <div className="min-h-screen bg-warm-cream">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/memory-match" element={<MemoryMatch />} />
        <Route path="/word-search" element={<WordSearch />} />
        <Route path="/solitaire" element={<Solitaire />} />
        <Route path="/mahjongg" element={<MahjonggSolitaire />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/jigsaw" element={<JigsawPuzzle />} />
      </Routes>
    </div>
  );
}

function App() {
  // Initialize Google Analytics once
  useEffect(() => {
    ReactGA.initialize('G-MNGWTM1XE3');
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
