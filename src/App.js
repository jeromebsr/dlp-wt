import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Player from './components/Player';
import WaitTime from './components/WaitTime';
import Schedule from './components/Schedule';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bgVideo from './assets/videos/bg.mp4';
import Shows from './components/Shows';


function App() {
  const [loadingState, setLoadingState] = useState();
  
  useEffect(() => {
    if (loadingState !== "start") return;

    const loadData = async () => {
      setLoadingState("complete");
    }
    loadData();    
    
  }, [loadingState]);
  
  useLayoutEffect(() => {
    if (loadingState !== "complete") return;
  }, [loadingState]);

  const startLoading = () => {
    if (!loadingState) {
      setLoadingState("start");
    }
  };
  
  return (
    <div className="panel flex-row" >
      {
        !loadingState
          ? 
          <div>
          <video autoPlay loop muted id='video'>
               <source src={bgVideo} type='video/mp4' />
           </video>
           <motion.div 
               style={{  
                   display: "block",
                   position: "absolute", 
                   top: "50%", 
                   left: "50%",
                   cursor: 'grab',
               }}
               drag
               onDragEnd 
               dragConstraints={{ 
                   left: -10,
                   right: 10,
                   top: -10, 
                   bottom: 10, 
               }}
           >
               <motion.h1 id='background' className='text-uppercase text-center'>
                   Disneyland Paris 
               </motion.h1>
               <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="up active"
                   style={{ borderRadius: 100, marginLeft: -120 }}
                   onClick={startLoading}
               >
                   Voir les temps d'attente       
               </motion.button>
           </motion.div> 
       </div>
          : <>
          <Player />
          <BrowserRouter>
            <AnimatePresence>
              <Routes>
                {/* <Route path='/' element={<Loader />} /> */}
                <Route path='/' element={<WaitTime />} />
                <Route path='/shows' element={<Shows />} />
                <Route path='/calendar' element={<Schedule />} />
                <Route path='*' element={<WaitTime />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
          </>
      }          
    </div>
    
  );
}

export default App;