import React, { useState, useEffect } from "react";
import styled from 'styled-components';

// -------STYLED COMPONENTS-------
const Header = styled.div`
    text-align: left;
    margin-left: 1%;
    margin-bottom: 2%;
    width: 50%;
    color: #000000;
`

const H2 = styled.h2`
    &::before {
        content: ${props => props.emoji ? props.emoji : 'inherit'};
    }
    font-size: 3rem;
`

const H4 = styled.h4`
    font-size: 2rem;
`

const Copyright = styled.p`
    font-size: 1rem;
`

const Explanation = styled.p`
    font-size: 1.2rem;
    letter-spacing: 1px;
    line-height: 140%;
`

// -------HEADING COMPONENT-------
function Heading({ title, date, copyright, explanation }) {
    return (
        <Header className='header'>
            <H2>{title}</H2>
            <H4>🗓 {date}</H4>
            <Explanation className='explanation'>{explanation}</Explanation>
            <Copyright className='copyright'>© <b>{copyright}</b></Copyright>
        </Header>
    );
}

export default Heading;