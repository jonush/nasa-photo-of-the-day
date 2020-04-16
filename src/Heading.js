import React, { useState, useEffect } from "react";
import "./Heading.css";
import axios from 'axios';

function Heading({ title, date, copyright, explanation }) {
    return (
        <div className="Heading">
            <h2>{title}</h2>
            <h4>{date}</h4>
            <p className='explanation'>{explanation}</p>
            <p className='copyright'>© 2020 <b>{copyright}</b></p>
        </div>
    );
}

export default Heading;