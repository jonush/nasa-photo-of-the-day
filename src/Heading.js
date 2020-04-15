import React, { useState, useEffect } from "react";
import "./Heading.css";
import axios from 'axios';

const url = 'https://api.nasa.gov/planetary/apod';
const api_key = 'kRfwFSln261qa5kxxPvHAKAHb3azNosA3kLe8dt0';

function Heading(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`${url}?api_key=${api_key}`)
      .then(res => {
        console.log(res.data.title);
        setData(res.data)
      })
      .catch(err => {
        alert('The Heading of the NASA APOD could not be retrieved.')
      })
  }, [])

  if(!data) {
    return null;
  } 
  return (
    <div className="Heading">
      <h2>{data.title}</h2>
      <h4>{data.date}</h4>
      <p className='copyright'>© 2020 <b>{data.copyright}</b></p>
      <p className='explanation'>{data.explanation}</p>
    </div>
  );
}

export default Heading;