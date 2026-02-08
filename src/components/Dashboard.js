import React from 'react';

const Dashboard = ({ onNavigate }) => {
  // Get formatted date for display
  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const formattedDate = getFormattedDate();

  return (
    <div className="min-h-screen p-6 sm:p-12 bg-gradient-to-br from-rose-light via-warm-cream-light to-lavender-light">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 text-6xl text-rose">❀</div>
        <div className="absolute top-40 right-20 text-6xl text-lavender">✿</div>
        <div className="absolute bottom-40 left-20 text-6xl text-peach">❀</div>
        <div className="absolute bottom-20 right-10 text-6xl text-rose">✿</div>
      </div>

      {/* Header */}
      <header className="text-center mb-12 relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-dark via-lavender-dark to-rose-dark mb-4 animate-fadeIn">
          Francine's App
        </h1>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl text-rose">✿</span>
          <p className="text-2xl sm:text-3xl font-display text-slate-grey-dark">
            {formattedDate}
          </p>
          <span className="text-3xl text-lavender">✿</span>
        </div>
        <p className="text-lg sm:text-xl font-light text-slate-grey italic">
          Choose an activity to begin
        </p>
      </header>

      {/* Activity Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">

        {/* Solitaire Card */}
        <div className="rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white via-peach-light to-white border-4 border-white shadow-xl relative overflow-hidden">
          {/* Decorative corner flourishes */}
          <div className="absolute top-2 left-2 text-3xl text-peach-dark opacity-40">❀</div>
          <div className="absolute top-2 right-2 text-3xl text-peach opacity-40">✿</div>
          <div className="absolute bottom-2 left-2 text-3xl text-peach opacity-40">✿</div>
          <div className="absolute bottom-2 right-2 text-3xl text-peach-dark opacity-40">❀</div>

          <div className="text-center mb-6 relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-peach to-peach-dark rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-12 border-4 border-white">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-script font-bold text-peach-dark mb-3">
              Solitaire
            </h3>
            <p className="text-lg sm:text-xl text-slate-grey-dark font-light mb-6">
              Classic card game with hints
            </p>
          </div>
          <button
            onClick={() => onNavigate('solitaire')}
            className="w-full bg-gradient-to-r from-peach to-peach-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl active:scale-95 relative z-10"
          >
            Play
          </button>
        </div>

        {/* Word Search Card */}
        <div className="rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white via-lavender-light to-white border-4 border-white shadow-xl relative overflow-hidden">
          {/* Decorative corner flourishes */}
          <div className="absolute top-2 left-2 text-3xl text-lavender-dark opacity-40">❀</div>
          <div className="absolute top-2 right-2 text-3xl text-lavender opacity-40">✿</div>
          <div className="absolute bottom-2 left-2 text-3xl text-lavender opacity-40">✿</div>
          <div className="absolute bottom-2 right-2 text-3xl text-lavender-dark opacity-40">❀</div>

          <div className="text-center mb-6 relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-lavender to-lavender-dark rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-12 border-4 border-white">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-script font-bold text-lavender-dark mb-3">
              Word Search
            </h3>
            <p className="text-lg sm:text-xl text-slate-grey-dark font-light mb-6">
              Find hidden words in the grid
            </p>
          </div>
          <button
            onClick={() => onNavigate('wordSearch')}
            className="w-full bg-gradient-to-r from-lavender to-lavender-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl active:scale-95 relative z-10"
          >
            Start
          </button>
        </div>

        {/* Memory Match Card */}
        <div className="rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white via-rose-light to-white border-4 border-white shadow-xl relative overflow-hidden">
          {/* Decorative corner flourishes */}
          <div className="absolute top-2 left-2 text-3xl text-rose-dark opacity-40">❀</div>
          <div className="absolute top-2 right-2 text-3xl text-rose opacity-40">✿</div>
          <div className="absolute bottom-2 left-2 text-3xl text-rose opacity-40">✿</div>
          <div className="absolute bottom-2 right-2 text-3xl text-rose-dark opacity-40">❀</div>

          <div className="text-center mb-6 relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-rose to-rose-dark rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-12 border-4 border-white">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-script font-bold text-rose-dark mb-3">
              Memory Match
            </h3>
            <p className="text-lg sm:text-xl text-slate-grey-dark font-light mb-6">
              Match pairs to win
            </p>
          </div>
          <button
            onClick={() => onNavigate('memoryMatch')}
            className="w-full bg-gradient-to-r from-rose to-rose-dark text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xl active:scale-95 relative z-10"
          >
            Play
          </button>
        </div>

      </div>

      {/* About link - subtle in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-20">
        <button
          onClick={() => onNavigate('about')}
          className="text-slate-grey-dark hover:text-rose-dark transition-colors duration-300 text-sm font-light underline decoration-dotted"
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
