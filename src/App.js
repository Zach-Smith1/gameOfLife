import React, { useState, useEffect } from 'react';
import Life from './Life.js';
import Modal from './Modal.js';
import About from './About.js';
import Instructions from './Instructions.js';

const App = () => {
  const [main, setMain] = useState('app');
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null)

  const switchModal = (pick) => {
    setActiveModal(pick)
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
        {activeModal === 'a' ? <About/> : <Instructions/>}
      </Modal>
      <div className='mainOptions'>
        <button className='mainPageButton' onClick={() => setMain('life')}>Start</button>
        <button className='mainPageButton' onClick={() =>switchModal('i')}>Instructions</button>
        <button className='mainPageButton' onClick={() => switchModal('a')}>About</button>
      </div>
    </div>
  ) : <Life/>
}

export default App;
