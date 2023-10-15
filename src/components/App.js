import Sidebar from './Sidebar';
import Main from './Main'
import { useState, useEffect } from 'react';
import { useDeckContext } from '../hooks/useDeckContext';

const App = () => {
  const [selectedDeck, setSelectedDeck] = useState()

  const props = {
    selectedDeck, setSelectedDeck
  }

  return (
    <div className="app">
      <Sidebar {...props}/>
      <Main {...props}/>
    </div>
  );
}

export default App;
