import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import dateFormat, { masks } from "dateformat";
import Navigation from '../components/Navigation';
import DatasSchedule from './DatasSchedule';

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
            .get("https://api.themeparks.wiki/preview/parks/DisneylandParisMagicKingdom/calendar")
            .then((res) => setDisneyParkData(res.data))

        axios
            .get("https://api.themeparks.wiki/preview/parks/DisneylandParisWaltDisneyStudios/calendar")
            .then((res) => setStudioParkData(res.data))
    }, []);

    return (
        <Container className='mt-5'>
            <Navigation />
            <h4><i className="fa-solid fa-calendar-days"></i> <b>Aujourd'hui</b></h4>
            <p className='offset-1'><b>{dateFormat(Date.now(), "dd/mm/yyyy")}</b></p>
            {
                disneyParkData
                .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                .map((el) => (
                    <DatasSchedule 
                        title='Parc Disneyland' 
                        icon='fa-wand-magic-sparkles'
                        openingTime={dateFormat(el.openingTime, "HH:MM")}
                        closingTime={dateFormat(el.closingTime, "HH:MM")}
                        openingExtraTime={dateFormat(el.special[0].openingTime, "HH:MM")}
                        closingExtraTime={dateFormat(el.special[0].closingTime, "HH:MM")}
                    />
                ))
            }
            {
                studioParkData
                .filter((data) => dateFormat(data.date, "dd-mm-yyyy") === dateFormat(Date.now(), "dd-mm-yyyy"))
                .map((el) => (
                    <DatasSchedule 
                        title='Parc Walt Disney Studios' 
                        icon='fa-film'
                        openingTime={dateFormat(el.openingTime, "HH:MM")}
                        closingTime={dateFormat(el.closingTime, "HH:MM")}
                        openingExtraTime={dateFormat(el.special[0].openingTime, "HH:MM")}
                        closingExtraTime={dateFormat(el.special[0].closingTime, "HH:MM")}
                    />
                ))
            } 
        </Container>
    );
}

export default Schedule;