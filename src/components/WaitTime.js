import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Alert, ListGroup, ButtonGroup, Form, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';

function WaitTime() {
    const [entity, setEntity] = useState("e8d0207f-da8a-4048-bec8-117aa946b2c2");
    const [waitTimeId, setWaitTimeId] = useState(1);
    const [waitTimeMin, setWaitTimeMin] = useState(0);
    const [WaitTimeMax, setWaitTimeMax] = useState(900);
    const [currentBgColor, setCurrentBgColor] = useState("");
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterStatus, setFilterStatus] = useState("OPERATING");
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});
    const [divWt, setDivWt] = useState(false);
    const [divPark, setDivPark] = useState(false);
    const [currentWt, setCurrentWt] = useState([]);
    const [currentPark, setCurrentPark] = useState("");

    
    const parksList = [
        {
            id: "e8d0207f-da8a-4048-bec8-117aa946b2c2",
            name: "Tous les Parcs",
        },
        {
            id: "dae968d5-630d-4719-8b06-3d107e944401",
            name: "Parc Disneyland",
        },
        {
            id: "ca888437-ebb4-4d50-aed2-d227f7096968",
            name: "Parc Walt Disney Studios",
        },
    ];

    const waitTimeList = [
        {
            id: 1,
            name: "Tous les temps",
            btnStyle: "primary",
            bgColor: "rgb(238 245 255)",
            min: 0,
            max: 900
        },
        {
            id: 2,
            name: "Moins de 15 min",
            btnStyle: "success",
            bgColor: "#eefff7",
            min: 0,
            max: 15
        },
        {
            id: 3,
            name: "Entre 15 et 45 min",
            btnStyle: "warning",
            bgColor: "#ffebdc",
            min: 15,
            max: 45
        },
        {
            id: 4,
            name: "Plus de 45 min",
            btnStyle: "danger",
            bgColor: "#fff1f1",
            min: 45,
            max: 900
        },
        {
            id: 5,
            name: "Fermé",
            btnStyle: "secondary",
            bgColor: "#E2E3E5",
            min: null,
            max: null
        },
    ];

    const parkName = (id) => {
        if(id === "dae968d5-630d-4719-8b06-3d107e944401") {
            return "Parc Disneyland"
        }else if (id === "ca888437-ebb4-4d50-aed2-d227f7096968") {
            return "Parc Walt Disney Studios"
        }else {
            return "error";
        }
    }

    const waitTimeColor = (wt) => {
        let setColor = "dark";

        if(wt > 0) {
            if(wt <= 15) {
                setColor = "success";
            }else if(wt > 15 && wt <= 45) {
                setColor = "warning";
            }else if (wt > 45) {
                setColor = "danger";
            }
        }else if(wt === 0) {
            setColor = "success";
        }else {
            setColor = "secondary"
        }

        return setColor;
    }

    const displayWaitTime = (wt) => {
        if(wt === null) {
            return "Fermé";
        }else if (wt === 0) {
            return "Ouvert";
        } else {
            return wt + " minutes";
        }
    }

    const formatFilter = (dataFilter) => {
        const arr = dataFilter.split(" ");

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].charAt(0))
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }

        return arr.join(" ");
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

    useEffect(() => {
        document.body.style.backgroundColor = currentBgColor;
        axios
            .get(`https://api.themeparks.wiki/v1/entity/${entity}/live`)
            .then((res) => setData(res.data.liveData))
    }, [currentBgColor, entity]);

    return (
        <motion.div 
            className="home" 
            initial="initial"
            animate="visible" 
            exit="exit"
            variants={variants}
        >  
            <Container className='mt-5 mb-5'>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDivPark(!divPark)}
                    className="up active"    
                >
                    {currentPark ? currentPark : "Choisir un parc"}
                </motion.button>
                <motion.div
                    transition={{ ease: "easeOut", duration: 1 }}
                    style={{ display: divPark ? '' : 'none' }}
                >
                    {
                        parksList.map((park) => (
                            <motion.button
                                key={park.id}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={park.id === entity ? "fill primary active" : "fill primary"}
                                onMouseDown={playClick}
                                onMouseEnter={playPop}
                                onClick={() => {
                                    setEntity(park.id);
                                    setDivPark(false);
                                    setCurrentPark(park.name)
                                }}
                            >
                                {park.name}        
                            </motion.button>
                        ))
                    }
                </motion.div>
                <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDivWt(!divWt)}
                        className={currentWt[1] ? currentWt[1] + " active" : "up active"}
                    >
                        {console.log(currentWt[1])}
                    {currentWt[0] ? currentWt[0] : "Trier par temps d'attente"}
                </motion.button>
                <motion.div
                        transition={{ ease: "easeOut", duration: 1 }}
                        style={{ display: divWt ? '' : 'none' }}
                    > 
                        {
                            waitTimeList.map((wl) => (
                                <motion.button
                                    key={wl.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={wl.id === waitTimeId ? "fill " + wl.btnStyle + " active" : "fill " + wl.btnStyle}
                                    onMouseEnter={playPop}
                                    onMouseDown={playClick}
                                    onClick={() => {
                                        setWaitTimeId(wl.id);
                                        setCurrentBgColor(wl.bgColor)
                                        setDivWt(false)
                                        setCurrentWt([wl.name, wl.btnStyle])
                                        
                                        if(wl.min === null) {
                                            setFilterStatus("CLOSED")
                                        }else {
                                            setFilterStatus("OPERATING")
                                            setWaitTimeMin(wl.min);
                                            setWaitTimeMax(wl.max);
                                        }
                                    }}
                                >
                                    {wl.name}
                                </motion.button>

                            ))
                        }
                    </motion.div>
               
                <Col className='mt-4'>
                <Form>
                    <Form.Control 
                        size="lg"
                        type="text"
                        placeholder="Chercher une attraction..." 
                        onChange={(e) => (setFilter(e.target.value))}
                        className="inputSearch"
                    />
                </Form>
                </Col>
                {
                    <ListGroup className='mt-5'> 
                        {data
                        .filter((data) => data.name.includes(formatFilter(filter)))
                        .filter((data) => filterStatus === "OPERATING" ? data.queue.STANDBY.waitTime > waitTimeMin && data.queue.STANDBY.waitTime < WaitTimeMax : data.status.includes(filterStatus))
                        .sort((a,b) => (a.queue.STANDBY.waitTime - b.queue.STANDBY.waitTime))
                        .map((el) => (
                            <motion.div 
                                transition={{ ease: "easeOut", duration: 1 }}
                                initial="initial"
                                animate="visible" 
                                exit="exit"
                                variants={variants}
                            > 
                                <div className='wtCard' key={el.id}>
                                    <h2>{el.name}</h2>
                                    <h5>{parkName(el.parkId)}</h5>
                                    <Alert variant={waitTimeColor(el.queue.STANDBY.waitTime)}>
                                        <i className="fa-solid fa-clock"></i> <b>{displayWaitTime(el.queue.STANDBY.waitTime)}</b>
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

export default WaitTime;
