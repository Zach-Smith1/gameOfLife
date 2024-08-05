import React, { useState, useEffect } from 'react';
import './App.css';
import Life from './Life.js';

const App = () => {
  const [main, setMain] = useState('app');

  const changeL = (e) => {
    e.preventDefault()
    setMain('life')
  }

  console.log(main)
  return main === 'app' ? (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <span onClick={changeL}>Life</span>
      </header>
    </div>
  ) : <Life/>
}

export default App;
