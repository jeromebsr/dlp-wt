import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          {/* <Route path='/' element={<Loader />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </AnimatePresence>
  </BrowserRouter>
  );
}

export default App;