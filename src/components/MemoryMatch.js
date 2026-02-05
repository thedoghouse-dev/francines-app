import React, { useState, useEffect } from 'react';

const MemoryMatch = ({ onExit }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [canClick, setCanClick] = useState(true);

  // Card icons - elegant line art concepts
  const cardPairs = [
    {
      id: 1,
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      name: 'Heart'
    },
    {
      id: 2,
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      name: 'Light'
    },
    {
      id: 3,
      icon: (
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      name: 'Star'
    },
  ];

  // Initialize game
  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeGame = () => {
    // Create pairs and shuffle
    const shuffledCards = [...cardPairs, ...cardPairs]
      .map((card, index) => ({ ...card, uniqueId: index }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setCanClick(true);
  };

  const handleCardClick = (index) => {
    if (!canClick) return;
    if (flippedIndices.includes(index)) return;
    if (matchedPairs.includes(cards[index].id)) return;

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setCanClick(false);
      setMoves(moves + 1);

      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        // Match found
        setTimeout(() => {
          setMatchedPairs([...matchedPairs, firstCard.id]);
          setFlippedIndices([]);
          setCanClick(true);
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
          setCanClick(true);
        }, 1200);
      }
    }
  };

  const isCardFlipped = (index) => {
    return flippedIndices.includes(index) || matchedPairs.includes(cards[index]?.id);
  };

  const isGameComplete = matchedPairs.length === cardPairs.length;

  return (
    <div className="min-h-screen p-6 sm:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-spa-teal-dark">
          Memory Match
        </h1>
        <button onClick={onExit} className="btn-secondary">
          HOME
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Game Stats */}
        <div className="card-elegant mb-8 text-center">
          <p className="text-2xl sm:text-3xl text-charcoal">
            <span className="font-semibold">Moves:</span> {moves}
          </p>
        </div>

        {/* Instructions */}
        {!isGameComplete && (
          <div className="card-elegant mb-8 text-center">
            <p className="text-2xl sm:text-3xl text-charcoal leading-relaxed">
              Click cards to find <span className="font-bold">matching pairs</span>
            </p>
          </div>
        )}

        {/* Card Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              disabled={!canClick && !flippedIndices.includes(index)}
              className={`
                aspect-square rounded-2xl transition-all duration-300
                flex items-center justify-center
                shadow-lg active:scale-95
                ${isCardFlipped(index)
                  ? 'bg-white border-4 border-spa-teal text-spa-teal-dark'
                  : 'bg-gradient-to-br from-slate-grey to-slate-grey-dark text-transparent hover:from-slate-grey-light hover:to-slate-grey'
                }
              `}
            >
              {isCardFlipped(index) && card.icon}
            </button>
          ))}
        </div>

        {/* Victory Message */}
        {isGameComplete && (
          <div className="card-elegant">
            <div className="gold-box text-center">
              <p className="text-4xl sm:text-5xl font-bold mb-6">
                Wonderful!
              </p>
              <p className="text-2xl sm:text-3xl mb-8">
                You completed the puzzle in <span className="font-bold">{moves}</span> moves
              </p>
              <button
                onClick={initializeGame}
                className="btn-primary"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryMatch;
