import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import dateFormat, { masks } from "dateformat";

function Schedule() {
    const [disneyParkData, setDisneyParkData] = useState([]);
    const [studioParkData, setStudioParkData] = useState([]);

    const getToday = () => {
        disneyParkData.map((el) => (
           dateFormat(disneyParkData.date, "dd-mm-yyyy")
        ))
    }

    useEffect(() => {
        axios
            .get("https://api.themeparks.wiki/v1/entity/dae968d5-630d-4719-8b06-3d107e944401/schedule")
            .then((res) => setDisneyParkData(res.data.schedule))

        axios
            .get("https://api.themeparks.wiki/v1/entity/ca888437-ebb4-4d50-aed2-d227f7096968/schedule")
            .then((res) => setStudioParkData(res.data.schedule))
    }, []);

    return (
        <Container className='mt-5'>
            <h4><i className="fa-solid fa-calendar-days"></i> <b>Aujourd'hui</b></h4>
            <p className='offset-1'><b>{dateFormat(Date.now(), "dd/mm/yyyy")}</b></p>
            <Card className='mb-3' border="primary" style={{ width: '18rem' }}>
                <Card.Header><b><i className="fa-solid fa-wand-magic-sparkles"></i> Parc Disneyland</b></Card.Header>
                <Card.Body>
                <Card.Text>
                <h5><Badge bg="info">Horaires</Badge></h5>
                    {
                        disneyParkData
                        .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                        .filter((data) => data.type === "OPERATING")
                        .map((el) => (
                            <>
                            <p><i className="fa-solid fa-clock"></i> De <b>{dateFormat(el.openingTime, "HH:MM")}</b> à <b>{dateFormat(el.closingTime, "HH:MM")}</b></p>
                            </>
                        ))
                    }
                    <h5><Badge bg="info">Heure de Magie</Badge></h5>
                    {
                        disneyParkData
                        .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                        .filter((data) => data.type === "EXTRA_HOURS")
                        .map((el) => (
                            <>
                            <p><i className="fa-solid fa-clock"></i> De <b>{dateFormat(el.openingTime, "HH:MM")}</b> à <b>{dateFormat(el.closingTime, "HH:MM")}</b></p>
                            </>
                        ))
                    }
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className='mb-3' border="primary" style={{ width: '18rem' }}>
                <Card.Header><b><i className="fa-solid fa-film"></i> Parc Walt Disney Studios</b></Card.Header>
                <Card.Body>
                <Card.Text>
                <h5><Badge bg="info">Horaires</Badge></h5>
                    {
                        studioParkData
                        .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                        .filter((data) => data.type === "OPERATING")
                        .map((el) => (
                            <>
                            <p><i className="fa-solid fa-clock"></i> De <b>{dateFormat(el.openingTime, "HH:MM")}</b> à <b>{dateFormat(el.closingTime, "HH:MM")}</b></p>
                            </>
                        ))
                    }
                    <h5><Badge bg="info">Heure de Magie</Badge></h5>
                    {
                        studioParkData
                        .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                        .filter((data) => data.type === "EXTRA_HOURS")
                        .map((el) => (
                            <>
                            <p><i className="fa-solid fa-clock"></i> De <b>{dateFormat(el.openingTime, "HH:MM")}</b> à <b>{dateFormat(el.closingTime, "HH:MM")}</b></p>
                            </>
                        ))
                    }
                </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Schedule;