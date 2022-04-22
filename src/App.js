import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Schedule from './components/Schedule';
import WaitTime from './components/WaitTime';


function App() {
  return (
    <AnimatePresence>
      <Container>
        <Row>
          <Col md={8}>
            <WaitTime />
          </Col>
          <Col md={4}>
            <Schedule />
          </Col>
        </Row>
      </Container>
    </AnimatePresence>
  );
}

export default App;