import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PUZZLE_IMAGES = [
  { src: '/images/schnauzers/schnauzer-1.jpg', label: 'Photo 1' },
  { src: '/images/schnauzers/schnauzer-2.jpg', label: 'Photo 2' },
  { src: '/images/schnauzers/schnauzer-3.jpg', label: 'Photo 3' },
  { src: '/images/schnauzers/schnauzer-4.jpg', label: 'Photo 4' },
  { src: '/images/schnauzers/schnauzer-5.jpg', label: 'Photo 5' },
  { src: '/images/schnauzers/schnauzer-6.jpg', label: 'Photo 6' },
];

const DIFFICULTIES = [
  { value: 'easy',   label: 'Easy',   grid: 3, description: '3×3 · 9 pieces' },
  { value: 'medium', label: 'Medium', grid: 4, description: '4×4 · 16 pieces' },
  { value: 'hard',   label: 'Hard',   grid: 5, description: '5×5 · 25 pieces' },
];

// Board piece size (px) and tray piece size per grid size
const PIECE_SIZES      = { 3: 110, 4: 85, 5: 68 };
const TRAY_PIECE_SIZES = { 3: 76,  4: 64, 5: 52 };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns inline style that shows a piece's slice of the image
function pieceStyle(pieceId, gridSize, imageSrc, size) {
  const [row, col] = pieceId.split('-').map(Number);
  const bgX = gridSize <= 1 ? 0 : (col * 100) / (gridSize - 1);
  const bgY = gridSize <= 1 ? 0 : (row * 100) / (gridSize - 1);
  return {
    backgroundImage: `url('${imageSrc}')`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
    backgroundPosition: `${bgX}% ${bgY}%`,
    width: size,
    height: size,
    flexShrink: 0,
  };
}

const JigsawPuzzle = () => {
  // ── screens: 'setup' | 'game' | 'win'
  const [screen, setScreen] = useState('setup');

  // ── setup choices
  const [chosenImage,      setChosenImage]      = useState(PUZZLE_IMAGES[0]);
  const [chosenDifficulty, setChosenDifficulty] = useState('easy');

  // ── active game state
  const [gameImage, setGameImage] = useState(PUZZLE_IMAGES[0]);
  const [gridSize,  setGridSize]  = useState(3);
  const [board,     setBoard]     = useState({});   // { slotKey: pieceId }
  const [tray,      setTray]      = useState([]);   // [pieceId, …]
  // selected: null | { id, from: 'tray'|'board', slotKey? }
  const [selected,  setSelected]  = useState(null);
  const [moves,     setMoves]     = useState(0);

  const totalPieces  = gridSize * gridSize;
  const correctCount = Object.entries(board).filter(([slot, piece]) => slot === piece).length;
  const pieceSize    = PIECE_SIZES[gridSize]      || 90;
  const traySize     = TRAY_PIECE_SIZES[gridSize] || 64;

  // ── Win detection
  useEffect(() => {
    if (
      screen === 'game' &&
      Object.keys(board).length === totalPieces &&
      correctCount === totalPieces
    ) {
      const t = setTimeout(() => setScreen('win'), 700);
      return () => clearTimeout(t);
    }
  }, [board, correctCount, totalPieces, screen]);

  // ── Start / restart game
  const startGame = () => {
    const gs = DIFFICULTIES.find(d => d.value === chosenDifficulty).grid;
    const pieces = [];
    for (let r = 0; r < gs; r++)
      for (let c = 0; c < gs; c++)
        pieces.push(`${r}-${c}`);
    setGameImage(chosenImage);
    setGridSize(gs);
    setBoard({});
    setTray(shuffle(pieces));
    setSelected(null);
    setMoves(0);
    setScreen('game');
  };

  // ── Click handler for a board slot
  const handleBoardSlotClick = (slotKey) => {
    const occupant = board[slotKey];

    if (!selected) {
      // Nothing selected — pick up the occupant (if any)
      if (occupant) setSelected({ id: occupant, from: 'board', slotKey });
      return;
    }

    const { id: pieceId, from, slotKey: fromSlot } = selected;

    // Tapping the same slot that's already selected → deselect
    if (from === 'board' && fromSlot === slotKey) {
      setSelected(null);
      return;
    }

    const newBoard = { ...board };
    let   newTray  = [...tray];

    if (from === 'tray') {
      newTray = newTray.filter(p => p !== pieceId);
      newBoard[slotKey] = pieceId;
      if (occupant) newTray = [...newTray, occupant];   // bumped piece back to tray
    } else {
      // board → board
      newBoard[slotKey] = pieceId;
      if (occupant) {
        newBoard[fromSlot] = occupant;    // swap
      } else {
        delete newBoard[fromSlot];
      }
    }

    setBoard(newBoard);
    setTray(newTray);
    setSelected(null);
    setMoves(m => m + 1);
  };

  // ── Click handler for a tray piece
  const handleTrayClick = (pieceId) => {
    // Tap selected tray piece again → deselect
    if (selected?.id === pieceId && selected.from === 'tray') {
      setSelected(null);
      return;
    }

    // If a board piece is selected, swap it with this tray piece
    if (selected?.from === 'board') {
      const { id: boardPiece, slotKey } = selected;
      setBoard({ ...board, [slotKey]: pieceId });
      setTray(tray.filter(p => p !== pieceId).concat(boardPiece));
      setSelected(null);
      setMoves(m => m + 1);
      return;
    }

    // Select (or change selection to) this tray piece
    setSelected({ id: pieceId, from: 'tray' });
  };

  // ════════════════════════════════════════════════
  // SETUP SCREEN
  // ════════════════════════════════════════════════
  if (screen === 'setup') {
    return (
      <div className="min-h-screen p-6 sm:p-12 bg-gradient-to-br from-rose-light via-warm-cream-light to-lavender-light flex flex-col items-center">
        <Helmet>
          <title>Jigsaw Puzzle - Francine's App</title>
          <meta name="description" content="Jigsaw puzzle game with schnauzer photos" />
        </Helmet>

        <header className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-dark via-lavender-dark to-rose-dark mb-3">
            Jigsaw Puzzle
          </h1>
          <p className="text-xl text-slate-grey">Choose a photo and difficulty, then start!</p>
        </header>

        {/* Photo selector */}
        <section className="mb-10 w-full max-w-lg">
          <h2 className="text-2xl font-display font-semibold text-charcoal text-center mb-5">
            Choose a Photo
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {PUZZLE_IMAGES.map((img) => (
              <button
                key={img.src}
                onClick={() => setChosenImage(img)}
                className={`rounded-2xl overflow-hidden border-4 transition-all duration-200 shadow-md focus:outline-none
                  ${chosenImage.src === img.src
                    ? 'border-rose-dark shadow-xl scale-105'
                    : 'border-white hover:border-lavender hover:scale-105'
                  }`}
              >
                <img src={img.src} alt={img.label} className="w-full aspect-square object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty selector */}
        <section className="mb-10">
          <h2 className="text-2xl font-display font-semibold text-charcoal text-center mb-5">
            Difficulty
          </h2>
          <div className="flex gap-3 sm:gap-5">
            {DIFFICULTIES.map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => setChosenDifficulty(value)}
                className={`py-4 px-5 sm:px-7 rounded-2xl text-center transition-all duration-200 border-4 shadow-md focus:outline-none
                  ${chosenDifficulty === value
                    ? 'bg-gradient-to-br from-lavender to-lavender-dark text-white border-lavender-dark scale-105 shadow-xl'
                    : 'bg-white text-charcoal border-warm-cream-dark hover:border-lavender hover:scale-105'
                  }`}
              >
                <div className="text-2xl font-bold mb-1">{label}</div>
                <div className="text-sm opacity-80">{description}</div>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={startGame}
          className="bg-gradient-to-r from-rose to-rose-dark text-white font-bold py-5 px-16 rounded-2xl text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95"
        >
          Start Puzzle ✿
        </button>

        <Link
          to="/"
          className="mt-8 text-slate-grey hover:text-rose-dark underline decoration-dotted transition-colors text-lg"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  // ════════════════════════════════════════════════
  // WIN SCREEN
  // ════════════════════════════════════════════════
  if (screen === 'win') {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-gradient-to-br from-rose-light via-warm-cream-light to-lavender-light text-center">
        <Helmet>
          <title>Puzzle Complete! - Francine's App</title>
        </Helmet>
        <div className="text-8xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-5xl sm:text-6xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-dark to-lavender-dark mb-4">
          Puzzle Complete!
        </h1>
        <p className="text-2xl text-charcoal mb-1">All {totalPieces} pieces placed!</p>
        <p className="text-xl text-slate-grey mb-8">Completed in {moves} moves</p>
        <img
          src={gameImage.src}
          alt="Completed puzzle"
          className="rounded-3xl shadow-2xl border-8 border-white mb-10"
          style={{ maxWidth: 340, width: '90%' }}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setScreen('setup')}
            className="bg-gradient-to-r from-rose to-rose-dark text-white font-bold py-4 px-10 rounded-2xl text-xl shadow-xl hover:shadow-2xl transition-all active:scale-95"
          >
            Play Again
          </button>
          <Link
            to="/"
            className="bg-gradient-to-r from-slate-grey to-slate-grey-dark text-white font-bold py-4 px-10 rounded-2xl text-xl shadow-xl text-center"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════
  // GAME SCREEN
  // ════════════════════════════════════════════════
  const hasSelection = selected !== null;
  const isFromTray   = selected?.from === 'tray';

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-rose-light via-warm-cream-light to-lavender-light">
      <Helmet>
        <title>Jigsaw Puzzle - Francine's App</title>
      </Helmet>

      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-script font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-dark via-lavender-dark to-rose-dark mb-2">
          Jigsaw Puzzle
        </h1>
        <div className="flex items-center justify-center gap-6 text-lg text-slate-grey-dark">
          <span>Moves: <strong>{moves}</strong></span>
          <span>
            Placed:{' '}
            <strong className={correctCount === totalPieces ? 'text-green-600' : ''}>
              {correctCount}/{totalPieces}
            </strong>
          </span>
        </div>
      </header>

      {/* Hint bar */}
      <p className="text-center text-base text-slate-grey mb-4 min-h-6">
        {hasSelection
          ? isFromTray
            ? '✦ Piece selected — tap a board slot to place it'
            : '✦ Piece lifted — tap another slot to move it'
          : 'Tap a piece from the tray below, then tap a board slot to place it'}
      </p>

      {/* Main area: board + side panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center max-w-5xl mx-auto">

        {/* Puzzle Board */}
        <div className="flex flex-col items-center overflow-x-auto">
          <div
            className="rounded-2xl border-4 border-lavender-dark shadow-2xl bg-warm-cream-dark"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, ${pieceSize}px)`,
              gap: 2,
              padding: 2,
            }}
          >
            {Array.from({ length: gridSize }, (_, row) =>
              Array.from({ length: gridSize }, (_, col) => {
                const slotKey  = `${row}-${col}`;
                const occupant = board[slotKey];
                const isCorrect      = occupant === slotKey;
                const isSelectedHere = selected?.from === 'board' && selected?.slotKey === slotKey;
                const isTargetSlot   = hasSelection && !occupant;

                return (
                  <div
                    key={slotKey}
                    onClick={() => handleBoardSlotClick(slotKey)}
                    className={`relative cursor-pointer overflow-hidden transition-all duration-150
                      ${!occupant
                        ? `border-2 border-dashed ${isTargetSlot ? 'border-rose bg-rose-light/40' : 'border-lavender/50 bg-lavender-light/20'}`
                        : ''}
                      ${isCorrect && !isSelectedHere ? 'ring-2 ring-inset ring-green-400' : ''}
                      ${isSelectedHere ? 'opacity-40 ring-2 ring-inset ring-rose-dark' : ''}
                    `}
                    style={{ width: pieceSize, height: pieceSize }}
                  >
                    {occupant && (
                      <div
                        style={pieceStyle(occupant, gridSize, gameImage.src, pieceSize)}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col items-center gap-4 lg:self-start lg:min-w-40">
          <p className="text-slate-grey font-semibold text-sm">Reference Photo</p>
          <img
            src={gameImage.src}
            alt="Reference"
            className="rounded-2xl shadow-lg border-4 border-peach-dark"
            style={{ width: Math.min(160, gridSize * pieceSize * 0.43), height: 'auto' }}
          />
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-lavender to-lavender-dark text-white font-semibold py-3 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg active:scale-95"
          >
            Restart
          </button>
          <button
            onClick={() => setScreen('setup')}
            className="w-full bg-gradient-to-r from-peach to-peach-dark text-white font-semibold py-3 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg active:scale-95"
          >
            New Puzzle
          </button>
          <Link
            to="/"
            className="w-full bg-gradient-to-r from-slate-grey to-slate-grey-dark text-white font-semibold py-3 px-5 rounded-xl shadow-lg text-lg text-center"
          >
            Home
          </Link>
        </div>
      </div>

      {/* Piece Tray */}
      <div className="max-w-5xl mx-auto mt-6">
        <p className="text-slate-grey font-semibold mb-2 text-center">
          Piece Tray — {tray.length} remaining
        </p>
        <div className="bg-white/60 backdrop-blur rounded-2xl border-2 border-lavender p-3 shadow-inner min-h-20 flex flex-wrap gap-2 justify-center">
          {tray.length === 0 ? (
            <p className="text-slate-grey italic self-center py-4">All pieces are on the board!</p>
          ) : (
            tray.map(id => {
              const isSelected = selected?.id === id && selected?.from === 'tray';
              return (
                <div
                  key={id}
                  onClick={() => handleTrayClick(id)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-150
                    ${isSelected
                      ? 'border-rose-dark ring-4 ring-rose ring-offset-1 scale-110 shadow-xl z-10 relative'
                      : 'border-lavender hover:border-lavender-dark hover:scale-105'
                    }`}
                  style={pieceStyle(id, gridSize, gameImage.src, traySize)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default JigsawPuzzle;
