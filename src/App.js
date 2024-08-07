import React, { useState, useEffect } from 'react';
import Life from './Life.js';
import Modal from './Modal.js'

const App = () => {
  const [main, setMain] = useState('app');
  const [isModalOpen, setModalOpen] = useState(false);

  const switchModal = () => {
    if (isModalOpen) {
      setModalOpen(false)
    } else {
      setModalOpen(true)
    }
  }

  return main === 'app' ? (
    <div className="App">
      <header className="header">Life</header>
      <Modal isOpen={isModalOpen} closeModal={switchModal}>
        <p>
        <h1>Conway's Game of Life</h1>
The Game of Life (an example of a cellular automaton) is played on an infinite two-dimensional rectangular grid of cells. Each cell can be either alive or dead. The status of each cell changes each turn of the game (also called a generation) depending on the statuses of that cell's 8 neighbors. Neighbors of a cell are cells that touch that cell, either horizontal, vertical, or diagonal from that cell.

The initial pattern is the first generation. The second generation evolves from applying the rules simultaneously to every cell on the game board, i.e. births and deaths happen simultaneously. Afterwards, the rules are iteratively applied to create future generations. For each generation of the game, a cell's status in the next generation is determined by a set of rules. These simple rules are as follows:

If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
If the cell is dead, then it springs to life only in the case that it has 3 live neighbors
There are, of course, as many variations to these rules as there are different combinations of numbers to use for determining when cells live or die. Conway tried many of these different variants before settling on these specific rules. Some of these variations cause the populations to quickly die out, and others expand without limit to fill up the entire universe, or some large portion thereof. The rules above are very close to the boundary between these two regions of rules, and knowing what we know about other chaotic systems, you might expect to find the most complex and interesting patterns at this boundary, where the opposing forces of runaway expansion and death carefully balance each other. Conway carefully examined various rule combinations according to the following three criteria:

There should be no initial pattern for which there is a simple proof that the population can grow without limit.
There should be initial patterns that apparently do grow without limit.
There should be simple initial patterns that grow and change for a considerable period of time before coming to an end in the following possible ways:
Fading away completely (from overcrowding or from becoming too sparse)
Settling into a stable configuration that remains unchanged thereafter, or entering an oscillating phase in which they repeat an endless cycle of two or more periods.
<h2>Example Patterns</h2>
Using the provided game board(s) and rules as outline above, the students can investigate the evolution of the simplest patterns. They should verify that any single living cell or any pair of living cells will die during the next iteration.

Some possible triomino patterns (and their evolution) to check:
<br/><br/>
<div className='pic'></div><img src='../public/icons/patterns.png' alt='patterns'/><div/>
<br/>

Here are some tetromino patterns (NOTE: The students can do maybe one or two of these on the game board and the rest on the computer):
<br/><br/>
<div className='pic'></div><img src='../public/icons/morePatterns.png' alt='patterns'/><div/>
<br/>


Some example still lifes:
<br/><br/>
Square :  <img src='../public/icons/sq.png' alt='patterns'/>
<br/><br/>
Boat :  <img src='../public/icons/boat.png' alt='patterns'/>
<br/><br/>
Loaf :  <img src='../public/icons/loaf.png' alt='patterns'/>
<br/><br/>
Ship :  <img src='../public/icons/ship.png' alt='patterns'/>
<br/><br/>
The following pattern is called a "glider." The students should follow its evolution on the game board to see that the pattern repeats every 4 generations, but translated up and to the left one square. A glider will keep on moving forever across the plane.<br/><br/>
<img src='../public/icons/glider.png' alt='patterns'/>
<br/><br/>
Another pattern similar to the glider is called the "lightweight space ship." It too slowly and steadily moves across the grid.<br/><br/>
<img src='../public/icons/lwss.png' alt='patterns'/>
<br/><br/>
Early on (without the use of computers), Conway found that the F-pentomino (or R-pentomino) did not evolve into a stable pattern after a few iterations. In fact, it doesn't stabilize until generation 1103.<br/><br/>
<img src='../public/icons/fpentamino.png' alt='patterns'/>
<br/><br/>
The F-pentomino stabilizes (meaning future iterations are easy to predict) after 1,103 iterations. The class of patterns which start off small but take a very long time to become periodic and predictable are called Methuselahs. The students should use the computer programs to view the evolution of this pattern and see how/where it becomes stable. The "acorn" is another example of a Methuselah that becomes predictable only after 5206 generations.<br/><br/>
<img src='../public/icons/meth.png' alt='patterns'/>
<br/><br/>
<h2>Computation</h2>
It's possible even, to create patterns which emulate logic gates (and, not, or, etc.) and counters. Building up from these, it was proved that the Game of Life is Turing Complete, which means that with a suitable initial pattern, one can do any computation that can be done on any computer. Later, Paul Rendell actually constructed a simple Turing Machine as a proof of concept, which can be found here. Although Rendell's Turing Machine is fairly small, it contains all of the ideas necessary to create larger machines that could actually do meaningful calculations. One of the patterns in Jason Summers' collection will compute prime numbers, and another will compute twin primes (two primes that only differ by adding or subtracting 2).

A very far zoom out of Paul Rendell's Turing Machine:
<br/><br/>
<img src='/../public/icons/turingMachine.gif' alt='patterns'/>
<br/><br/><br/>
Source: <a href="https://pi.math.cornell.edu/~lipa/mec/lesson6.html" target="_blank" rel='noreferrer'>pi.math.cornell.edu</a>https://pi.math.cornell.edu/~lipa/mec/lesson6.html
        </p>
      </Modal>
      <div className='mainOptions'>
        <button onClick={switchModal}>About</button>
        <button onClick={() => setMain('life')}>Start</button>
      </div>
    </div>
  ) : <Life/>
}

export default App;
