import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import Heading from './Heading';

const url = 'https://api.nasa.gov/planetary/apod';
const api_key = 'kRfwFSln261qa5kxxPvHAKAHb3azNosA3kLe8dt0';

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`${url}?api_key=${api_key}`)
      .then(res => {
        console.log(res.data);
        setData(res.data)
      })
      .catch(err => {
        alert('The NASA Image of the Day could not be retrieved.')
      })
  }, [])

  if(!data) {
    return null;
  } 
  return (
    <div className="App">
      {/* <p>
        Read through the instructions in the README.md file to build your NASA app! Have fun <span role="img" aria-label='go!'>🚀</span>!
      </p> */}
      <h1>🚀 NASA Astronomy Picture of the Day 🚀</h1>
      <div className='content'>
        <img src={data.hdurl} alt='image of the day'></img>
        <Heading />
      </div>
    </div>
  );
}

export default App;
