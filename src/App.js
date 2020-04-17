import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import "./App.css";
import axios from 'axios';
import Heading from './Heading';

// -------URL & API KEY-------
const url = 'https://api.nasa.gov/planetary/apod';
const api_key = 'kRfwFSln261qa5kxxPvHAKAHb3azNosA3kLe8dt0';

// -------START & END DATE FOR CALENDAR-------
var origin = new Date('Fri Jun 16 1995 00:00:00 GMT-0700 (Pacific Daylight Time)').toISOString().slice(0, 10);
var local = (new Date()).getTimezoneOffset() * 60000;
var today = (new Date(Date.now() - local)).toISOString().slice(0, 10);

// -------STYLING COMPONENTS-------
const ContentContainer = styled.div`
  @media (max-width: 1500px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const H1 = styled.h1`
  color: ${props => props.color ? props.color : 'inherit'};
  font-size: 5rem;

  &::before {
    content: '🚀'
  }

  &::after {
    content: '🚀'
  }

  @media (max-width: 1500px){
    font-size: 2rem;
  }
`

const Image = styled.img`
  border-radius: 10px;
  margin: 5% 5% 0;
  transition: transform .5s ease-in-out;
  /*box-shadow: 5px 5px 10px -3px #000000;*/

  @media (max-width: 1500px){
    width: 60%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    /*box-shadow: 0px 4px 2px -1px #000000;*/

    @media (max-width: 1500px){
      transform: none;
    }
  }
`

const Form = styled.form`
  margin: 2% auto 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1500px){
    margin: 2% auto 0;
  }
`

const Input = styled.input`
  width: 350px;
  padding: 10px 0;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 10px 0 0 10px;
  color: royalblue;
  background-color: azure;
  box-shadow:0px 0px 0px 2px royalblue inset;
  border: none;
`

const Button = styled.button`
  width: 100px;
  padding: 8px 0;
  font-size: 1.2rem;
  border-radius: 0 10px 10px 0;
  border: none;
  background-color: royalblue;
  color: azure;

  &:hover {
    cursor: pointer;
    color: azure;
    background-color: red;
    /* box-shadow:0px 0px 0px 2px #FFFFFF inset; */
  }
`

// -------APP COMPONENT-------
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
      <H1 color='#000000'> NASA Astronomy Picture of the Day </H1>

      <Form onSubmit={getSearch}>
        <Input className='calendar' type='date' value={search} onChange={newSearch} min={origin} max={today}></Input>
        <Button type='submit'>Search</Button>
      </Form>

      <ContentContainer className='content'>
        <Image src={data.hdurl} alt='image of the day' onClick={()=> window.open(`${data.hdurl}`, "_blank")}></Image>
        <Heading title={data.title} date={data.date} copyright={data.copyright} explanation={data.explanation} />
      </ContentContainer>
    </div>
  );
}

export default App;
