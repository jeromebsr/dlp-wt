import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import Schedule from './components/Schedule';
import WaitTime from './components/WaitTime';
import Player from './components/Player';

function App() {
  
  useEffect(() => {
    return () => {
      <Preloader />
    }
}, []);

  return (
    <>
    <Player />
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          {/* <Route path='/' element={<Loader />} /> */}
          <Route path='/' element={<WaitTime />} />
          <Route path='/calendar' element={<Schedule />} />
          <Route path='*' element={<WaitTime />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
    </>
  );
}

export default App;