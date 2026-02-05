import React, { useState, useEffect } from 'react';
import { getTodayWord, getFormattedDate } from '../wordList';

const Dashboard = ({ onNavigate }) => {
  const todayWord = getTodayWord();
  const formattedDate = getFormattedDate();
  const [randomImage, setRandomImage] = useState(null);

  // Pick a random schnauzer image on mount
  useEffect(() => {
    const imageNumber = Math.floor(Math.random() * 6) + 1;
    setRandomImage(`/images/schnauzers/schnauzer-${imageNumber}.jpg`);
  }, []);

  return (
    <div className="min-h-screen p-6 sm:p-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-spa-teal-dark mb-4">
          Francine's Daily Activities
        </h1>
        <p className="text-2xl sm:text-3xl text-slate-grey">
          {formattedDate}
        </p>
      </header>

      {/* Daily Word Display */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="gold-box text-center">
          {/* Schnauzer Image */}
          {randomImage && (
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-charcoal-dark shadow-2xl">
                <img
                  src={randomImage}
                  alt="Schnauzer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Hide if image fails to load
                    e.target.parentElement.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <p className="text-2xl sm:text-3xl mb-4 tracking-wide">Today's Focus</p>
          <h2 className="text-5xl sm:text-7xl font-bold mb-4 tracking-wider">
            {todayWord.word}
          </h2>
          <p className="text-xl sm:text-2xl italic opacity-90">
            {todayWord.description}
          </p>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Solitaire Card */}
        <div className="card-elegant">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-spa-teal rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-3">
              Solitaire
            </h3>
            <p className="text-xl sm:text-2xl text-slate-grey mb-6">
              Classic card game with hints
            </p>
          </div>
          <button
            onClick={() => onNavigate('solitaire')}
            className="btn-primary w-full"
          >
            PLAY
          </button>
        </div>

        {/* Word Search Card */}
        <div className="card-elegant">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-spa-teal rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-3">
              Word Search
            </h3>
            <p className="text-xl sm:text-2xl text-slate-grey mb-6">
              Find hidden words in the grid
            </p>
          </div>
          <button
            onClick={() => onNavigate('wordSearch')}
            className="btn-primary w-full"
          >
            START
          </button>
        </div>

        {/* Memory Match Card */}
        <div className="card-elegant">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-spa-teal rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-3">
              Memory Match
            </h3>
            <p className="text-xl sm:text-2xl text-slate-grey mb-6">
              Match pairs to win
            </p>
          </div>
          <button
            onClick={() => onNavigate('memoryMatch')}
            className="btn-primary w-full"
          >
            PLAY
          </button>
        </div>

        {/* Schnauzer Gallery Card */}
        <div className="card-elegant">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-spa-teal rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-3">
              Schnauzer Gallery
            </h3>
            <p className="text-xl sm:text-2xl text-slate-grey mb-6">
              Explore beautiful photos with fun facts
            </p>
          </div>
          <button
            onClick={() => onNavigate('gallery')}
            className="btn-primary w-full"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
