import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListeDesPokemon from './components/ListeDesPokemon';
import DetailsDuPokemon from './components/DetailsDuPokemon';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListeDesPokemon />} />
        <Route path="/pokemon/:id" element={<DetailsDuPokemon/>} />
      </Routes>
    </Router>
  );
}

export default App;
