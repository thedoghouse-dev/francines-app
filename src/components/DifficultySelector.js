import React from 'react';

const DifficultySelector = ({ difficulty, onDifficultyChange, className = '' }) => {
  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'bg-green-500 hover:bg-green-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { value: 'hard', label: 'Hard', color: 'bg-red-500 hover:bg-red-600' }
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p className="text-2xl sm:text-3xl font-semibold text-charcoal mb-4">
        Difficulty Level
      </p>
      <div className="flex gap-3 sm:gap-4">
        {difficulties.map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() => onDifficultyChange(value)}
            className={`
              py-3 px-6 sm:py-4 sm:px-8 rounded-xl text-xl sm:text-2xl font-bold
              text-white transition-all duration-300 shadow-lg
              active:scale-95 transform
              ${difficulty === value
                ? `${color} ring-4 ring-offset-2 ring-gold-leaf scale-105`
                : 'bg-slate-grey hover:bg-slate-grey-dark'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
