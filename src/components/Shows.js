import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Alert, ListGroup, Row, Col, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';
import Navigation from './Navigation';
import dateFormat, { masks } from "dateformat";

function Shows() {
    const [entity, setEntity] = useState("e8d0207f-da8a-4048-bec8-117aa946b2c2");
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get(`https://api.themeparks.wiki/v1/entity/${entity}/live`)
            .then((res) => setData(res.data.liveData))
    }, [entity]);

    const formatFilter = (dataFilter) => {
        const arr = dataFilter.split(" ");

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].charAt(0))
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        return arr.join(" ");
    }
    const parkName = (id) => {
        if(id === "dae968d5-630d-4719-8b06-3d107e944401") {
            return "Parc Disneyland"
        }else if (id === "ca888437-ebb4-4d50-aed2-d227f7096968") {
            return "Parc Walt Disney Studios"
        }else {
            return "error";
        }
    }
    
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

    const showsTime = (showTime) => {
        const getCurrentTime = Date.now();
        const showTimeList = [
            showTime.startTime 
        ]
        console.log(showTimeList)
        return getCurrentTime > showTimeList[0] ? null : " " + dateFormat(showTimeList[0], "HH:MM").replace(':', 'h') + " - "
    }

    return (
        <motion.div 
            transition={{ ease: "easeOut", duration: 1 }}
            initial="initial"
            animate="visible" 
            exit="exit"
            variants={variants}
        >  
            <Navigation />
            <Container className='mt-5 mb-5'>
                <Col className='mt-4'>
                    <Form>
                        <Form.Control 
                            size="lg"
                            type="text"
                            placeholder="Rechercher un spectacle..." 
                            onChange={(e) => (setFilter(e.target.value))}
                            className="inputSearch"
                        />
                    </Form>
                </Col>
                {
                    <ListGroup className='mt-5'> 
                        {data
                        .filter((data) => data.name.includes(formatFilter(filter)))
                        .filter((data) => data.entityType === "SHOW")
                        .map((el, index) => (
                            // console.log(el),
                            <motion.div 
                                key={index}
                                transition={{ ease: "easeOut", duration: 1 }}
                                initial="initial"
                                animate="visible" 
                                exit="exit"
                                variants={variants}
                            > 
                                <div className='wtCard' key={el.id}>
                                    <h2>{el.name}</h2>
                                    <h5>{parkName(el.parkId)}</h5>
                                    <Alert variant="success">
                                    <i className="fa-solid fa-clock"></i> Séances du jour : 
                                    {el.showtimes.map((time) => (
                                        showsTime(time) 
                                    ))}
                                    </Alert>
                                </div>   
                            </motion.div>
                        ))}
                    </ListGroup>
                }
            </Container>
        </motion.div>
    );
}
{/* {dateFormat(el.showtimes[0].startTime, "HH:MM")} */}
export default Shows;