import { useMemo, useState } from 'react';

function App() {
  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [flippedIndexSet, setFlippedIndexSet] = useState(new Set())
  const [shuffleKey, setShuffleKey] = useState(0)
  // No per-index image state needed when using CSS mapping

  const numbers = useMemo(() => {
    const arr = Array.from({ length: 10 }, (_, i) => i + 1);
    return shuffleArray(arr);
  }, [shuffleKey])

  const _handleCardClick = (index) => {
    setFlippedIndexSet(prev => {
      // If clicking the same open card, close all; else open only this one
      if (prev.has(index)) {
        return new Set()
      }
      return new Set([index])
    })

    // No JS image selection; CSS handles via data-num
  }

  const _handleReset = () => {
    setFlippedIndexSet(new Set())
    setShuffleKey(prev => prev + 1) // Trigger reshuffle
  }

  return (
    <div className="app-wrapper d-flex flex-column ">
      <div className="container d-flex flex-column flex-grow-1 py-4">

        <div className="d-flex justify-content-between align-items-center mb-3 page-header">
          <h1 className="h4 m-0">Choose your favourite Number</h1>
          <button className="btn btn-outline-secondary btn-sm" onClick={_handleReset}>Reset</button>
        </div>

        <div className="card-grid flex-grow-1">
          {numbers.map((num, idx) => {
            const isFlipped = flippedIndexSet.has(idx)
            return (
              <div key={num}>
                <div
                  className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => _handleCardClick(idx)}
                  role="button"
                  aria-label={`Card ${num}`}
                >
                  <div className="flip-card-inner">
                    <div className="flip-face flip-front">
                      <div className="number-pill">{num}</div>
                    </div>
                    <div className="flip-face flip-back card-back" data-num={num} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-3 text-center text-white small">Tap a card to flip and reveal an image</div>
        {/* Developer badge */}
        <div className="developer-badge">Developer: Vijay</div>
      </div>
    </div>
  )
}

export default App
