import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TILE_SIZE = 90;
const TILE_STEP = TILE_SIZE + 4; // 94px per tile
const DEPTH_X = 3;  // shift right per layer (depth illusion)
const DEPTH_Y = 3;  // shift up per layer (depth illusion)
const PADDING = 15;

// 36 unique tile symbols — 2 of each = 72 tiles total
const TILE_TYPES = [
  { id: 0,  sym: '🌸' }, { id: 1,  sym: '🌺' }, { id: 2,  sym: '🌻' },
  { id: 3,  sym: '🌹' }, { id: 4,  sym: '🌷' }, { id: 5,  sym: '🌼' },
  { id: 6,  sym: '🍀' }, { id: 7,  sym: '🍁' }, { id: 8,  sym: '🍂' },
  { id: 9,  sym: '🌿' }, { id: 10, sym: '🌊' }, { id: 11, sym: '🌙' },
  { id: 12, sym: '☀️' }, { id: 13, sym: '⭐' }, { id: 14, sym: '🌈' },
  { id: 15, sym: '⚡' }, { id: 16, sym: '❤️' }, { id: 17, sym: '💛' },
  { id: 18, sym: '💚' }, { id: 19, sym: '💙' }, { id: 20, sym: '💜' },
  { id: 21, sym: '🎵' }, { id: 22, sym: '💎' }, { id: 23, sym: '🎯' },
  { id: 24, sym: '🍎' }, { id: 25, sym: '🍊' }, { id: 26, sym: '🍋' },
  { id: 27, sym: '🍇' }, { id: 28, sym: '🍓' }, { id: 29, sym: '🍒' },
  { id: 30, sym: '🦋' }, { id: 31, sym: '🐝' }, { id: 32, sym: '🦊' },
  { id: 33, sym: '🐢' }, { id: 34, sym: '🐬' }, { id: 35, sym: '🐦' },
];

// Board layout: 3 layers, 72 tile positions total
// Layer 0: cols 0-4, rows 0-7 → 40 tiles  (5 wide × 8 tall)
// Layer 1: cols 1-3, rows 0-7 → 24 tiles  (3 wide × 8 tall, centered)
// Layer 2: cols 1-2, rows 2-5 →  8 tiles  (2 wide × 4 tall, centered)
const BOARD_LAYOUT = (() => {
  const pos = [];
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 5; c++)
      pos.push({ col: c, row: r, layer: 0 });
  for (let r = 0; r < 8; r++)
    for (let c = 1; c < 4; c++)
      pos.push({ col: c, row: r, layer: 1 });
  for (let r = 2; r < 6; r++)
    for (let c = 1; c < 3; c++)
      pos.push({ col: c, row: r, layer: 2 });
  return pos; // 40 + 24 + 8 = 72
})();

const BOARD_W = 5 * TILE_STEP + DEPTH_X * 2 + PADDING * 2;
const BOARD_H = 8 * TILE_STEP + PADDING * 2 + DEPTH_Y * 2;

// --- Pure helper functions ---

function isTileFree(tileId, tiles) {
  const tile = tiles.find(t => t.id === tileId);
  if (!tile || tile.removed) return false;

  // Covered from above: any non-removed tile at same col/row, higher layer
  const coveredAbove = tiles.some(t =>
    !t.removed && t.id !== tileId &&
    t.layer > tile.layer &&
    t.col === tile.col && t.row === tile.row
  );
  if (coveredAbove) return false;

  // Blocked on both left and right at the same layer
  const hasLeft = tiles.some(t =>
    !t.removed && t.layer === tile.layer &&
    t.col === tile.col - 1 && t.row === tile.row
  );
  const hasRight = tiles.some(t =>
    !t.removed && t.layer === tile.layer &&
    t.col === tile.col + 1 && t.row === tile.row
  );
  return !(hasLeft && hasRight);
}

function getFreeTiles(tiles) {
  return tiles.filter(t => !t.removed && isTileFree(t.id, tiles));
}

function hasAvailableMatch(tiles) {
  const free = getFreeTiles(tiles);
  for (let i = 0; i < free.length; i++)
    for (let j = i + 1; j < free.length; j++)
      if (free[i].typeId === free[j].typeId) return true;
  return false;
}

function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createTiles() {
  const types = fisherYates([...TILE_TYPES, ...TILE_TYPES]); // 72 shuffled
  return BOARD_LAYOUT.map((pos, idx) => ({
    id: idx,
    col: pos.col,
    row: pos.row,
    layer: pos.layer,
    typeId: types[idx].id,
    sym: types[idx].sym,
    removed: false,
  }));
}

// --- Component ---

const MahjonggSolitaire = () => {
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [hintIds, setHintIds] = useState([]);
  const [boardScale, setBoardScale] = useState(1);
  const boardContainerRef = useRef(null);

  const initGame = () => {
    setTiles(createTiles());
    setSelected(null);
    setMoves(0);
    setGameWon(false);
    setIsStuck(false);
    setHintIds([]);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (boardContainerRef.current) {
        const available = boardContainerRef.current.offsetWidth;
        const natural = BOARD_W + 32; // board width + 2×16px inner padding
        setBoardScale(Math.min(1, available / natural));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleTileClick = (tileId) => {
    if (!isTileFree(tileId, tiles)) return;
    setHintIds([]);

    if (selected === null) {
      setSelected(tileId);
      return;
    }
    if (selected === tileId) {
      setSelected(null);
      return;
    }

    const selTile = tiles.find(t => t.id === selected);
    const clicked = tiles.find(t => t.id === tileId);

    if (selTile && clicked && selTile.typeId === clicked.typeId) {
      // Match — remove both tiles
      const newTiles = tiles.map(t =>
        t.id === selected || t.id === tileId ? { ...t, removed: true } : t
      );
      setTiles(newTiles);
      setSelected(null);
      setMoves(m => m + 1);

      if (newTiles.every(t => t.removed)) {
        setGameWon(true);
      } else if (!hasAvailableMatch(newTiles)) {
        setIsStuck(true);
      }
    } else {
      // No match — select the new tile instead
      setSelected(tileId);
    }
  };

  const handleHint = () => {
    setSelected(null);
    const free = getFreeTiles(tiles);
    for (let i = 0; i < free.length; i++) {
      for (let j = i + 1; j < free.length; j++) {
        if (free[i].typeId === free[j].typeId) {
          setHintIds([free[i].id, free[j].id]);
          return;
        }
      }
    }
    setIsStuck(true);
  };

  const handleShuffle = () => {
    const remaining = tiles.filter(t => !t.removed);
    if (remaining.length < 2) return;

    let newTiles;
    let attempts = 0;
    do {
      const types = fisherYates(remaining.map(t => ({ typeId: t.typeId, sym: t.sym })));
      newTiles = tiles.map(t => {
        if (t.removed) return t;
        const idx = remaining.findIndex(r => r.id === t.id);
        return { ...t, typeId: types[idx].typeId, sym: types[idx].sym };
      });
      attempts++;
    } while (!hasAvailableMatch(newTiles) && attempts < 50);

    setTiles(newTiles);
    setSelected(null);
    setHintIds([]);
    setIsStuck(false);
  };

  const remainingCount = tiles.filter(t => !t.removed).length;
  const matchedCount = tiles.length - remainingCount;

  return (
    <>
      <Helmet>
        <title>Mahjongg Solitaire - Tile Matching Game | Francine's App</title>
        <meta name="description" content="Match pairs of tiles in this classic Mahjongg Solitaire game. Remove all 72 tiles to win!" />
        <meta property="og:title" content="Mahjongg Solitaire - Tile Matching Game | Francine's App" />
        <meta property="og:description" content="Match pairs of tiles in this classic Mahjongg Solitaire game. Remove all 72 tiles to win!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://francinesapp.com/mahjongg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mahjongg Solitaire - Tile Matching Game | Francine's App" />
        <meta name="twitter:description" content="Match pairs of tiles in this classic Mahjongg Solitaire game. Remove all 72 tiles to win!" />
      </Helmet>

      <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-spa-teal-light via-warm-cream-light to-lavender-light relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-10 left-10 text-4xl text-spa-teal">❀</div>
          <div className="absolute top-20 right-10 text-4xl text-lavender">✿</div>
          <div className="absolute bottom-20 left-10 text-4xl text-peach">✿</div>
          <div className="absolute bottom-10 right-10 text-4xl text-rose">❀</div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-spa-teal-dark to-lavender-dark">
            Mahjongg Solitaire
          </h1>
          <Link
            to="/"
            className="bg-gradient-to-r from-slate-grey to-slate-grey-dark text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg sm:text-xl active:scale-95"
          >
            Home
          </Link>
        </div>

        {/* Stats & Controls */}
        <div className="card-elegant mb-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-spa-teal-dark">{moves}</div>
                <div className="text-sm text-slate-grey">Moves</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-spa-teal-dark">{remainingCount}</div>
                <div className="text-sm text-slate-grey">Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-spa-teal-dark">{matchedCount}</div>
                <div className="text-sm text-slate-grey">Matched</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleHint}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:shadow-md transition-all duration-300 text-base sm:text-lg active:scale-95"
              >
                Hint
              </button>
              <button
                onClick={handleShuffle}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:shadow-md transition-all duration-300 text-base sm:text-lg active:scale-95"
              >
                Shuffle
              </button>
              <button
                onClick={initGame}
                className="bg-gradient-to-r from-spa-teal to-spa-teal-dark text-white font-semibold py-2 px-4 rounded-xl shadow hover:shadow-md transition-all duration-300 text-base sm:text-lg active:scale-95"
              >
                New Game
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card-elegant mb-4 p-3 text-center relative z-10">
          <p className="text-lg sm:text-xl text-charcoal">
            Click two matching tiles to remove them — only <span className="font-bold text-spa-teal-dark">free tiles</span> (bright) can be selected
          </p>
        </div>

        {/* Board */}
        <div ref={boardContainerRef} className="relative z-10">
          <div className="flex justify-center">
          <div
            className="rounded-2xl shadow-2xl bg-gradient-to-br from-spa-teal/10 to-lavender/10 border-2 border-spa-teal/20 overflow-hidden"
            style={{
              width: (BOARD_W + 32) * boardScale + 'px',
              height: (BOARD_H + 32) * boardScale + 'px',
            }}
          >
            <div
              style={{
                padding: '16px',
                width: BOARD_W + 32 + 'px',
                height: BOARD_H + 32 + 'px',
                transform: `scale(${boardScale})`,
                transformOrigin: 'top left',
              }}
            >
            <div style={{ position: 'relative', width: BOARD_W + 'px', height: BOARD_H + 'px' }}>
              {tiles.map(tile => {
                if (tile.removed) return null;

                const free = isTileFree(tile.id, tiles);
                const isSelected = selected === tile.id;
                const isHint = hintIds.includes(tile.id);

                const x = PADDING + tile.col * TILE_STEP + tile.layer * DEPTH_X;
                const y = PADDING + tile.row * TILE_STEP - tile.layer * DEPTH_Y;
                const zIndex = tile.layer * 200 + tile.col + tile.row;

                let bgClass, borderClass, shadowStyle, filterStyle;
                if (isSelected) {
                  bgClass = 'bg-gradient-to-br from-gold-leaf-light to-gold-leaf';
                  borderClass = 'border-gold-leaf-dark';
                  shadowStyle = '0 0 0 3px #9B7E1F, 2px 4px 10px rgba(0,0,0,0.4)';
                  filterStyle = 'none';
                } else if (isHint) {
                  bgClass = 'bg-gradient-to-br from-green-50 to-green-100';
                  borderClass = 'border-green-500';
                  shadowStyle = '0 0 0 3px #22c55e, 2px 4px 10px rgba(0,0,0,0.4)';
                  filterStyle = 'none';
                } else if (free) {
                  bgClass = 'bg-gradient-to-br from-white to-warm-cream';
                  borderClass = 'border-spa-teal/50 hover:border-spa-teal';
                  shadowStyle = '2px 3px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)';
                  filterStyle = 'none';
                } else {
                  bgClass = 'bg-white';
                  borderClass = 'border-slate-300';
                  shadowStyle = '1px 2px 4px rgba(0,0,0,0.15)';
                  filterStyle = 'grayscale(1) opacity(0.55)';
                }

                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    disabled={!free}
                    title={free ? `${tile.sym} — click to select` : `${tile.sym} — blocked`}
                    style={{
                      position: 'absolute',
                      left: x + 'px',
                      top: y + 'px',
                      width: TILE_SIZE + 'px',
                      height: TILE_SIZE + 'px',
                      zIndex,
                      fontSize: '52px',
                      lineHeight: '1',
                      boxShadow: shadowStyle,
                      filter: filterStyle,
                    }}
                    className={`
                      rounded-lg flex items-center justify-center select-none
                      transition-all duration-150
                      ${bgClass} ${borderClass}
                      ${free ? 'border-4 cursor-pointer hover:scale-105 active:scale-95' : 'border cursor-not-allowed'}
                      ${isSelected || isHint ? 'scale-105' : ''}
                    `}
                  >
                    {tile.sym}
                  </button>
                );
              })}
            </div>
            </div>
          </div>
          </div>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn p-4">
            <div className="card-elegant max-w-lg w-full">
              <div className="gold-box text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-gold-leaf rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="text-4xl sm:text-5xl font-bold mb-4 animate-bounce">🎉 You Won! 🎉</p>
                  <p className="text-xl sm:text-2xl mb-6">
                    All tiles matched in{' '}
                    <span className="font-bold text-2xl sm:text-3xl">{moves}</span> moves!
                  </p>
                  <button onClick={initGame} className="btn-primary text-lg sm:text-xl">
                    PLAY AGAIN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stuck Modal */}
        {isStuck && !gameWon && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn p-4">
            <div className="card-elegant max-w-lg w-full">
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-300">
                <p className="text-3xl sm:text-4xl font-bold mb-4 text-orange-800">😔 No More Moves!</p>
                <p className="text-lg sm:text-xl mb-6 text-orange-700">
                  No matching pairs are available. Shuffle the tiles or start a new game.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={handleShuffle}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow hover:shadow-md transition-all duration-300 text-lg active:scale-95"
                  >
                    SHUFFLE TILES
                  </button>
                  <button onClick={initGame} className="btn-primary text-lg">
                    NEW GAME
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MahjonggSolitaire;
