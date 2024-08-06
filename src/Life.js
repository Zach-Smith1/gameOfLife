import React, { useState, useEffect } from 'react';

const Life = () => {
  const [boxSize, setBoxSize] = useState(10);
  const [boxCount, setBoxCount] = useState(20);
  const [rowCount, setRowCount] = useState(20);
  const [matrix, setMatrix] = useState([]);
  const [lastTick, setLastTick] = useState(1000);
  const [tick, setTick] = useState(90000);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      let windowHeight = window.innerHeight;
      let windowWidth = window.innerWidth;
      let boxSize = Math.max(screenWidth, screenHeight) * 0.005; // Each box is 1% of the screen width
      if (screenWidth < 900 || screenHeight < 900) boxSize *= 2; // box's bigger on mobile
      const newBoxCount = Math.floor(Math.min(windowWidth, screenWidth) / boxSize);
      const newRowCount = Math.floor(Math.min(windowHeight, screenHeight) / boxSize);
      console.log(screenHeight, windowHeight)
      setBoxSize(boxSize);
      setBoxCount(newBoxCount);
      setRowCount(newRowCount);
    };

    window.addEventListener('resize', updateLayout);

    updateLayout(); // Initial call to set up layout

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateLayout);
  }, [boxCount, rowCount]);

  const newMatrix = () => {
    setMatrix(Array.from({ length: rowCount }).map(() => (
      Array.from({ length: boxCount }).fill(0))
    ))
  }

  useEffect(() => {
    // starting matrix
    newMatrix()
  }, [rowCount, boxCount])

  const handleClick = (rowIndex, colIndex) => {
    setMatrix(prevMatrix =>
      prevMatrix.map((row, rIndex) =>
        row.map((cell, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex
            ? cell = 1 : cell
            // cell === 0 ? 1 : 0 : cell
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
    if (lastTick <= 5) {
      return
    } else if (lastTick <= 50) {
      setLastTick(t - 5)
      setTick(t - 5);
    } else if (lastTick <= 100) {
      setLastTick(t - 10)
      setTick(t - 10);
    } else {
      setLastTick(t - 100)
      setTick(t - 100);
    }
  }
  const slowDown = () => {
    let t = lastTick;
    setLastTick(t + 100)
    setTick(t + 100);
  }
  const pause = () => {
    let p = paused;
    if (!p) {
      setLastTick(tick);
      setTick(2147000000)
    } else {
      setTick(lastTick)
    }
    setPaused(!p)
  }
  // click and drag handlers
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

  // Touch event handlers
  const handleTouchStart = () => {
    setIsMouseDown(true);
  };

  const handleTouchEnd = () => {
    setIsMouseDown(false);
  };

  const handleTouchMove = (event, rowIndex, colIndex) => {
    // Get the first touch point
    const touch = event.touches[0];
    // Get the touch coordinates relative to the viewport
    let x = touch.clientX;
    let y = touch.clientY;
    x = Math.floor(x/boxSize)
    y = Math.floor(y/boxSize)

    if (isMouseDown) {
      handleClick(y, x);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(nextGen, tick);
    return () => clearInterval(intervalId);
  }, [tick, matrix]);

  return (
    <div className='grid'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      // onMouseMove={(e) => handleMouseMove(rowIndex, colIndex)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    onTouchMove={() => handleTouchMove(event)}
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
              onTouchMove={() => handleTouchMove(event,rowIndex, colIndex)}
            >
              {/* cell content here */}
            </div>
          ))}
        </div>
      ))}
      <div className='controls'>
        <span className='buttons'>
          {/* <button onClick={pause}>{paused === true ? '\u{25B6}' : <strong>{'\u{23F8}'}</strong> }</button>*/}
        <button onClick={pause}>{'\u{25B6}'} <strong id='pause'>{'\u{23F8}'}<strong/></strong></button>
          {/* <button onClick={() => setTick(lastTick)}>GO</button> */}
          <button id='arrowButton' onClick={nextGen}>+1 Gen</button>
          <button id='arrowButton' onClick={speedUp}>&#9650;</button>
          <button id='arrowButton' onClick={slowDown}>&#9660;</button>
          <button id='clearButton' onClick={newMatrix}>Clear</button>
          <span className='info'>{paused ? 'Paused' : `${Math.round((1000/tick)*100)/100} gen/ sec`}</span>
        </span>
      </div>
    </div>
  )
};

export default Life;

