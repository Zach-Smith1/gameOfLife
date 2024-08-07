import React from 'react';

const Instructions = () => {

  return (
    <div className='instructions'>
      <h2>How to Play</h2>
      <p>- Touch/ click a cell to bring it to life<br/><br/>
      - Drag your mouse/ finger to bring many cells to life at once<br/><br/>
      - If a cell has 2 or 3 live neighbors it will stay alive into the next generation<br/><br/>
      - If a live cell has less than 2 or more than 3 live neighbors it die (simulating over/underpopulation)<br/><br/>
      - If a dead cell has exactly 3 live neighbors it will come to life in the next generation<br/><br/>
      - See how much complexity can arise from these simple rules and HAVE FUN!
      </p>
      <h2>Buttons</h2>
      <button id='arrowButton'>{'\u{2302}'}</button><br />
      <span>Returns you to the homepage</span>
      <br />
      <button id='clearButton'>Clear</button><br />
      <span>Kills all cells on the board</span>
      <br />
      <button id='arrowButton'>+1 Gen</button><br />
      <span>Moves simultion forward one generation</span>
      <br />
      <button id='arrowButton'>&#9650;</button><br />
      <span>Increases simultion speed (decreases time between generations)</span>
      <br />
      <button id='arrowButton'>&#9660;</button><br />
      <span>Decreases simultion speed (increase time between generations)</span>
      <br />
      <button>{'\u{25B6}'} <strong id='pause'>{'\u{23F8}'}<strong /></strong></button><br />
      <span>Pauses/ plays simultion</span>
      <br />
    </div>
  )
}
export default Instructions