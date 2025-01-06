import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import MenuView from './components/MenuView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/m/:id" element={<MenuView />} />
      </Routes>
    </Router>
  );
};

export default App;
