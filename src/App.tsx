import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';

const App = () => {
  return (
    <Routes >
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App
