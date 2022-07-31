import React from 'react';
import { motion } from "framer-motion";
import Navigation from './Navigation';
import { Button, Container } from 'react-bootstrap';
  
function PaymentSuccess(props) {
    const variants = {
        initial: {
          opacity: 0,
          trasition: { duration: 0.5 },
          x: 100,
        },
        visible: {
          opacity: 1,
          x: 0,
        },
        exit: {
          opacity: 0,
          transition: { duuration: 0.3 },
          x: -100,
        },
      };
    return (
        <motion.div
            transition={{ ease: "easeOut", duration: 1 }}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={variants}
        >
            <Navigation />
            <Container className='text-center' style={{paddingTop:80}}>
              <h1>Merci pour votre don !</h1>
              <p>Votre don a bien été prit en compte. Merci infiniment pour votre contribution. 💖</p>
              <Button>Retour</Button>
            </Container>
        </motion.div>
    );
}

export default PaymentSuccess;