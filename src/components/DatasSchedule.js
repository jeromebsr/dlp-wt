import { motion } from 'framer-motion';
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function DatasSchedule({ title, icon, openingTime, closingTime, openingExtraTime, closingExtraTime}) {
    const variants = {
        initial: {
            opacity: 0,
            trasition: {duration: 0.5},
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
        }
    }
    return (
        <motion.div
            transition={{ ease: "easeOut", duration: 1 }}
            initial="initial"
            animate="visible" 
            exit="exit"
            variants={variants}
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