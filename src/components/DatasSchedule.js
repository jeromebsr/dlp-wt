import { motion } from 'framer-motion';
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function DatasSchedule({ title, icon, openingTime, closingTime, openingExtraTime, closingExtraTime}) {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "calc(100vw - 100%)" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            style={{ x: 100 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <Card className='mb-3' border="primary" style={{ 
                width: '18rem',
                border: 'none'
            }}>
                <Card.Header style={{
                    backgroundColor: '#5879e4',
                    color: 'white',
                }}>
                    <b><i className={"fa-solid "+icon}></i> {title}</b>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <h5>
                            <Badge bg="info">Horaires</Badge>
                        </h5>
                        <p>
                            <i className="fa-solid fa-clock"></i> De <b>{openingTime}</b> à <b>{closingTime}</b>
                        </p>
                        <h5>
                            <Badge bg="info">Heure de Magie</Badge>
                        </h5>
                        <p>
                            <i className="fa-solid fa-clock"></i> De <b>{openingExtraTime}</b> à <b>{closingExtraTime}</b>
                        </p>
                        </Card.Text>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default DatasSchedule;