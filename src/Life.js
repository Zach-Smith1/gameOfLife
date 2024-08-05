import React, { useState, useEffect } from 'react';

const Grid = () => {
  const [boxSize, setBoxSize] = useState(10);
  const [boxCount, setBoxCount] = useState(20);
  const [rowCount, setRowCount] = useState(20);
  const [matrix, setMatrix] = useState([]);
  const [lastTick, setLastTick] = useState(1000);
  const [tick, setTick] = useState(90000);
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.screen.width;
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      const boxSize = screenWidth * 0.005; // Each box is 1% of the screen width
      const newBoxCount = Math.floor(windowWidth / boxSize);
      const newRowCount = Math.floor(windowHeight / boxSize);
      setBoxSize(boxSize);
      setBoxCount(newBoxCount);
      setRowCount(newRowCount);
    };

    window.addEventListener('resize', updateLayout);

    updateLayout(); // Initial call to set up layout

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateLayout);
  }, [boxCount, rowCount]);

  useEffect(() => {
    // starting matrix
    setMatrix(Array.from({ length: rowCount }).map(() => (
      Array.from({ length: boxCount }).fill(0))
    ))
  }, [rowCount, boxCount])

  const handleClick = (rowIndex, colIndex) => {
    setMatrix(prevMatrix =>
      prevMatrix.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex
            ? cell === 0 ? 1 : 0
            : cell
        )
      )
    );
  };

  const nextGen = () => {
    const m = matrix;
    let newMatrix = Array.from({ length: rowCount }, () => []);

    const cellUpdate = (r, c) => {
      let neighbors = 0;
      let upLeft = (r > 0 && c > 0) ? m[r - 1][c - 1] : 0;
      let up = (r > 0) ? m[r - 1][c] : 0;
      let upRight = (r > 0 && c < m[0].length - 1) ? m[r - 1][c + 1] : 0;
      let left = (c > 0) ? m[r][c - 1] : 0;
      let right = (c < m[0].length - 1) ? m[r][c + 1] : 0;
      let downLeft = (r < m.length - 1 && c > 0) ? m[r + 1][c - 1] : 0;
      let down = (r < m.length - 1) ? m[r + 1][c] : 0;
      let downRight = (r < m.length - 1 && c < m[0].length - 1) ? m[r + 1][c + 1] : 0;
      neighbors += upLeft
      neighbors += up
      neighbors += upRight
      neighbors += left
      neighbors += right
      neighbors += down
      neighbors += downLeft
      neighbors += downRight

      if (m[r][c] === 0) {
        if (neighbors === 3) {
          return 1
        } else {
          return 0
        }
      }
      if (m[r][c] === 1 && (neighbors > 3 || neighbors < 2)) return 0
      return 1
    }

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < boxCount; col++) {
        newMatrix[row].push(cellUpdate(row, col))
      }
    }
    setMatrix(newMatrix)
  }

  const speedUp = () => {
    let t = lastTick;
    setLastTick(t-100)
    setTick(t-100);
  }
  const slowDown = () => {
    let t = lastTick;
    setLastTick(t+100)
    setTick(t+100);
  }
  const pause = () => {
    setLastTick(tick);
    setTick(99999)
  }

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (rowIndex, colIndex) => {
    if (isMouseDown) {
      handleClick(rowIndex, colIndex);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextGen, tick);

    return () => clearInterval(intervalId);
  }, [tick, matrix]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp} // To handle the case when mouse leaves the grid
  >
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              style={{
                width: boxSize + 'px',
                height: boxSize + 'px',
                backgroundColor: cell === 0 ? 'black' : 'white',
                // margin: '1px', // Optional: Add margin for spacing
              }}
              onClick={() => handleClick(rowIndex, colIndex)}
              onMouseMove={() => handleMouseMove(rowIndex, colIndex)}
            >
              {/* cell content here */}
            </div>
          ))}
        </div>
      ))}
      <br />
      <div className='controls'>
      <span className='buttons'>
        <button onClick={() => setTick(lastTick)}>GO</button>
        <button onClick={nextGen}>UPDATE</button>
        <button onClick={pause}>Pause</button>
        <button onClick={speedUp}>^</button>
        <button onClick={slowDown}>v</button>
      </span>
      </div>
    </div>
  )
};

export default Grid;

