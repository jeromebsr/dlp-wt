import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import dateFormat, { masks } from "dateformat";
import Navigation from '../components/Navigation';
import DatasSchedule from './DatasSchedule';

function Schedule() {
    const [disneyParkData, setDisneyParkData] = useState([]);
    const [studioParkData, setStudioParkData] = useState([]);

    useEffect(() => {
        axios
            // .get("https://api.themeparks.wiki/preview/parks/DisneylandParisMagicKingdom/calendar")
            .get("https://api.themeparks.wiki/v1/entity/dae968d5-630d-4719-8b06-3d107e944401/schedule")
            .then((res) => setDisneyParkData(res.data.schedule))
        axios
            .get("https://api.themeparks.wiki/v1/entity/ca888437-ebb4-4d50-aed2-d227f7096968/schedule")
            .then((res) => setStudioParkData(res.data.schedule))
    }, []);
    
    
    return (
        <Container className='mt-5'>
            <Navigation />
            <h4><i className="fa-solid fa-calendar-days"></i> <b>Aujourd'hui</b></h4>
            <p className='offset-1'><b>{dateFormat(Date.now(), "dd/mm/yyyy")}</b></p>
            
            <DatasSchedule 
                title='Parc Disneyland' 
                icon='fa-wand-magic-sparkles'
                openingTime={dateFormat(disneyParkData[1]?.openingTime, "HH:MM")}
                closingTime={dateFormat(disneyParkData[1]?.closingTime, "HH:MM")}
                openingExtraTime={dateFormat(disneyParkData[0]?.openingTime, "HH:MM")}
                closingExtraTime={dateFormat(disneyParkData[0]?.closingTime, "HH:MM")}
            />
                
            <DatasSchedule 
                title='Parc Walt Disney Studios' 
                icon='fa-film'
                openingTime={dateFormat(studioParkData[1]?.openingTime, "HH:MM")}
                closingTime={dateFormat(studioParkData[1]?.closingTime, "HH:MM")}
                openingExtraTime={dateFormat(studioParkData[0]?.openingTime, "HH:MM")}
                closingExtraTime={dateFormat(studioParkData[0]?.closingTime, "HH:MM")}
            />
        </Container>
    );
}

export default Schedule;