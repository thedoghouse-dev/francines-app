import React, { useState, useEffect } from 'react';

const WordSearch = ({ onExit }) => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [firstClick, setFirstClick] = useState(null);

  // Word bank for puzzle generation
  const WORD_BANK = [
    'SCHNAUZER', 'LOYAL', 'FRIEND', 'BARK', 'PLAY', 'WALK',
    'FETCH', 'TREAT', 'CUDDLE', 'GENTLE', 'SMART', 'BRAVE',
    'HOME', 'HAPPY', 'TRUST', 'CARE', 'KIND', 'CALM',
    'PEACE', 'GUARD', 'WATCH', 'LOVE', 'FAMILY', 'PATIENT',
    'NOBLE', 'GRACE', 'DEVOTED', 'PROTECT', 'COMPANION'
  ];

  // Generate a new puzzle on mount
  useEffect(() => {
    generatePuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePuzzle = () => {
    // Randomly select 6 words from the word bank
    const shuffledBank = [...WORD_BANK].sort(() => Math.random() - 0.5);
    const wordList = shuffledBank.slice(0, 6);
    const gridSize = 8;
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const placedWords = [];

    // Place words horizontally and vertically
    wordList.forEach(word => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 50) {
        const horizontal = Math.random() > 0.5;
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (horizontal && col + word.length <= gridSize) {
          // Check if space is available
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (newGrid[row][col + i] !== '' && newGrid[row][col + i] !== word[i]) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            // Place word
            const cells = [];
            for (let i = 0; i < word.length; i++) {
              newGrid[row][col + i] = word[i];
              cells.push({ row, col: col + i });
            }
            placedWords.push({ word, cells });
            placed = true;
          }
        } else if (!horizontal && row + word.length <= gridSize) {
          // Check if space is available
          let canPlace = true;
          for (let i = 0; i < word.length; i++) {
            if (newGrid[row + i][col] !== '' && newGrid[row + i][col] !== word[i]) {
              canPlace = false;
              break;
            }
          }

          if (canPlace) {
            // Place word
            const cells = [];
            for (let i = 0; i < word.length; i++) {
              newGrid[row + i][col] = word[i];
              cells.push({ row: row + i, col });
            }
            placedWords.push({ word, cells });
            placed = true;
          }
        }

        attempts++;
      }
    });

    // Fill empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setWords(placedWords);
    setFoundWords([]);
    setSelectedCells([]);
    setFirstClick(null);
  };

  const handleCellClick = (row, col) => {
    if (!firstClick) {
      // First click - select starting cell
      setFirstClick({ row, col });
      setSelectedCells([{ row, col }]);
    } else {
      // Second click - try to find word between first and second click
      const cells = getCellsBetween(firstClick, { row, col });

      if (cells.length > 1) {
        const selectedWord = cells.map(cell => grid[cell.row][cell.col]).join('');
        const matchedWord = words.find(w =>
          w.word === selectedWord && !foundWords.includes(w.word)
        );

        if (matchedWord) {
          setFoundWords([...foundWords, matchedWord.word]);
          setSelectedCells([]);
          setFirstClick(null);
        } else {
          // Invalid selection - clear and start over
          setFirstClick(null);
          setSelectedCells([]);
        }
      } else {
        // Same cell clicked or invalid - clear selection
        setFirstClick(null);
        setSelectedCells([]);
      }
    }
  };

  const getCellsBetween = (start, end) => {
    const cells = [];

    // Horizontal
    if (start.row === end.row) {
      const minCol = Math.min(start.col, end.col);
      const maxCol = Math.max(start.col, end.col);
      for (let col = minCol; col <= maxCol; col++) {
        cells.push({ row: start.row, col });
      }
    }
    // Vertical
    else if (start.col === end.col) {
      const minRow = Math.min(start.row, end.row);
      const maxRow = Math.max(start.row, end.row);
      for (let row = minRow; row <= maxRow; row++) {
        cells.push({ row, col: start.col });
      }
    }

    return cells;
  };

  const isCellInFoundWord = (row, col) => {
    return words.some(w =>
      foundWords.includes(w.word) &&
      w.cells.some(cell => cell.row === row && cell.col === col)
    );
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  const allWordsFound = foundWords.length === words.length;

  return (
    <div className="min-h-screen p-6 sm:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-spa-teal-dark">
          Word Search
        </h1>
        <button onClick={onExit} className="btn-secondary">
          HOME
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Instructions */}
        <div className="card-elegant mb-8 text-center">
          <p className="text-2xl sm:text-3xl text-charcoal leading-relaxed">
            Click the <span className="font-bold">FIRST</span> letter, then click the <span className="font-bold">LAST</span> letter of a word
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Word Grid */}
          <div className="lg:col-span-2">
            <div className="card-elegant">
              <div className="grid grid-cols-8 gap-2 sm:gap-3">
                {grid.map((row, rowIndex) =>
                  row.map((letter, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`
                        aspect-square rounded-lg text-3xl sm:text-4xl font-bold
                        transition-all duration-200 active:scale-95
                        ${isCellInFoundWord(rowIndex, colIndex)
                          ? 'bg-spa-teal/30 text-spa-teal-dark border-2 border-spa-teal'
                          : isCellSelected(rowIndex, colIndex)
                          ? 'bg-gold-leaf/40 text-charcoal-dark border-2 border-gold-leaf'
                          : 'bg-warm-cream-dark text-charcoal hover:bg-slate-grey-light/30'
                        }
                      `}
                    >
                      {letter}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Word List */}
          <div>
            <div className="card-elegant">
              <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal mb-6 text-center">
                Words to Find
              </h2>
              <ul className="space-y-4">
                {words.map((w, index) => (
                  <li
                    key={index}
                    className={`
                      text-2xl sm:text-3xl py-3 px-4 rounded-lg text-center font-medium
                      transition-all duration-300
                      ${foundWords.includes(w.word)
                        ? 'bg-spa-teal text-white line-through'
                        : 'bg-warm-cream-dark text-charcoal'
                      }
                    `}
                  >
                    {w.word}
                  </li>
                ))}
              </ul>

              {allWordsFound && (
                <div className="mt-8 p-6 bg-gold-leaf/20 rounded-xl border-2 border-gold-leaf">
                  <p className="text-3xl sm:text-4xl font-bold text-center text-charcoal-dark">
                    Excellent Work!
                  </p>
                  <button
                    onClick={generatePuzzle}
                    className="btn-primary w-full mt-4"
                  >
                    NEW PUZZLE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
