import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Alert, ListGroup, Button, ButtonGroup, Form, Col } from 'react-bootstrap';

function WaitTime() {
    const [entity, setEntity] = useState("e8d0207f-da8a-4048-bec8-117aa946b2c2");
    const [waitTimeId, setWaitTimeId] = useState(1);
    const [waitTimeMin, setWaitTimeMin] = useState(0);
    const [WaitTimeMax, setWaitTimeMax] = useState(900);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [filterStatus, setFilterStatus] = useState("OPERATING");
    
    const parksList = [
        {
            id: "e8d0207f-da8a-4048-bec8-117aa946b2c2",
            name: "Tous les Parcs",
        },
        {
            id: "dae968d5-630d-4719-8b06-3d107e944401",
            name: "Disneyland Park",
        },
        {
            id: "ca888437-ebb4-4d50-aed2-d227f7096968",
            name: "Walt Disney Studios Park",
        },
    ];

    const waitTimeList = [
        {
            id: 1,
            name: "Tous les temps",
            btnStyle: "primary",
            min: 0,
            max: 900
        },
        {
            id: 2,
            name: "Moins de 15 min",
            btnStyle: "success",
            min: 0,
            max: 15
        },
        {
            id: 3,
            name: "Entre 15 et 45 min",
            btnStyle: "warning",
            min: 15,
            max: 45
        },
        {
            id: 4,
            name: "Plus de 45 min",
            btnStyle: "danger",
            min: 45,
            max: 900
        },
        {
            id: 5,
            name: "Fermé",
            btnStyle: "secondary",
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

    useEffect(() => {
        axios
            .get(`https://api.themeparks.wiki/v1/entity/${entity}/live`)
            .then((res) => setData(res.data.liveData))
    });

    return (
        <Container className='mt-5 mb-5'>
            <Form className='mb-3'>
                <Form.Control 
                    size="lg"
                    type="text"
                    placeholder="Chercher une attraction..." 
                    onChange={(e) => (setFilter(e.target.value))}
                />
            </Form>
            <h6>Choisir un parc :</h6>
            <ButtonGroup>
                {
                    parksList.map((park) => (
                        <Button
                            key={park.id}
                            variant={park.id === entity ? "primary" : "outline-primary"}
                            onClick={() => {
                                setEntity(park.id);
                            }}
                        >
                            {park.name}        
                        </Button>
                    ))
                }
            </ButtonGroup>
            <Col className='mt-2'>
                <h6>Trier par temps d'attente :</h6>
                <ButtonGroup>
                   {
                       waitTimeList.map((wl) => (
                           <Button
                                key={wl.id}
                                variant={wl.id === waitTimeId ? wl.btnStyle : "outline-"+wl.btnStyle}
                                onClick={() => {
                                    setWaitTimeId(wl.id);
                                    
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
                           </Button>

                       ))
                   }
                </ButtonGroup>
            </Col>
            {
                <ListGroup className='mt-5'> 
                    {
                    data
                    .filter((data) => data.name.includes(formatFilter(filter)))
                    .filter((data) => filterStatus === "OPERATING" ? data.queue.STANDBY.waitTime > waitTimeMin && data.queue.STANDBY.waitTime < WaitTimeMax : data.status.includes(filterStatus))
                    .sort((a,b) => (a.queue.STANDBY.waitTime - b.queue.STANDBY.waitTime))
                    .map((el) => (
                        <ListGroup.Item key={el.id}>
                            <h2>{el.name}</h2>
                            <h5>{parkName(el.parkId)}</h5>
                            <Alert variant={waitTimeColor(el.queue.STANDBY.waitTime)}>
                                <i className="fa-solid fa-clock"></i> <b>{displayWaitTime(el.queue.STANDBY.waitTime)}</b>
                            </Alert>
                        </ListGroup.Item>   
                    ))}
                </ListGroup>
            }
        </Container>
    );
}

export default WaitTime;
