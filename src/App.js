import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import Heading from './Heading';

const url = 'https://api.nasa.gov/planetary/apod';
const api_key = 'kRfwFSln261qa5kxxPvHAKAHb3azNosA3kLe8dt0';

// Setting min and max dates on calendar for fetching data from API
var origin = new Date('Fri Jun 16 1995 00:00:00 GMT-0700 (Pacific Daylight Time)').toISOString().slice(0, 10);
var local = (new Date()).getTimezoneOffset() * 60000;
var today = (new Date(Date.now() - local)).toISOString().slice(0, 10);

function App() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(today);

  const newSearch = event => {
    setSearch(event.target.value)
  }

  const getSearch = event => {
    // prevent page from reloading every search
    event.preventDefault();
    setDate(search);
  }

  useEffect(() => {
    axios.get(`${url}?api_key=${api_key}&date=${date}`)
      .then(res => {
        console.log(res.data);
        setData(res.data)
      })
      .catch(err => {
        
      })
  }, [date])

  if(!data) {
    return null;
  } 
  return (
    <div className="App">
      {/* <p>
        Read through the instructions in the README.md file to build your NASA app! Have fun <span role="img" aria-label='go!'>🚀</span>!
      </p> */}
      <h1><span role="img" aria-label='go!'>🚀</span> NASA Astronomy Picture of the Day <span role="img" aria-label='go!'>🚀</span></h1>

      <form onSubmit={getSearch}>
        <input className='calendar' type='date' value={search} onChange={newSearch} min={origin} max={today}></input>
        <button type='submit'>Search</button>
      </form>

      <div className='content'>
        <img src={data.hdurl} alt='image of the day' onClick={()=> window.open(`${data.hdurl}`, "_blank")}></img>
        <Heading title={data.title} date={data.date} copyright={data.copyright} explanation={data.explanation} />
      </div>
    </div>
  );
}

export default App;
