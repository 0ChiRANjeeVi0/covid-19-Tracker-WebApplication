import React,{useState,useEffect} from 'react';
import {Navbar,Form,Button} from 'react-bootstrap';
import Graph from "./components/Graph.js";

const keyLabelsCases = []
const keyLabelsDeath = []
const daysFilterCases = (dates) =>{
  for(var i=0;i<dates.length;i++){
    var val = dates[i].slice(0,7)
    keyLabelsCases[i]=val;

  }
}
const daysFilterDeath = (dates) =>{
  for(var i=0;i<dates.length;i++){
    var val = dates[i].slice(0,7)
    keyLabelsDeath[i] = val;

  }
}

export default function App(){

  const [casesglobal, setCasesglobal] = useState([]);
  const [deathsglobal, setDeathsglobal] = useState([]);
  const [input, setInput] = useState('');
  const [title, setTitle] = useState('Around The Globe')

  const getCountrycases = async(country) =>{
      await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=6`)
      .then((response) => response.json())
      .then((json) =>{daysFilterCases(Object.keys(json.timeline.cases))
        setCasesglobal(Object.values(json.timeline.cases))
      })
      .catch((err) =>{alert("Enter A Valid Country")})
      await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=6`)
      .then((response) => response.json())
      .then((json) =>{daysFilterDeath(Object.keys(json.timeline.deaths))
        setDeathsglobal(Object.values(json.timeline.deaths))
      })
      setTitle('In'+" "+" "+input);
      setInput('');
  }

  useEffect(() =>{
    
    const getWorldcases = async() =>{
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=6')
      .then((response) => response.json())
      .then((json) => {daysFilterCases(Object.keys(json.cases))
        setCasesglobal(Object.values(json.cases))

      })
      
    }
    const getWorldDeath= async() =>{
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=6')
      .then((response) => response.json())
      .then((json) => {daysFilterDeath(Object.keys(json.deaths))
        setDeathsglobal(Object.values(json.deaths))

      })
      
    }
    getWorldcases();
    getWorldDeath();
  },[])
  return(
    <div className="">
      <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand className="d-flex align-items-center">
          <img className="" src="https://img.icons8.com/external-others-phat-plus/50/000000/external-corona-covid-19-color-line-others-phat-plus-13.png"/>
          <h1 className="fs-5">Covid-19 Tracker</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-hidden"/>
          <Navbar.Collapse id="navbar-hidden">
            <div className="ms-auto d-flex">
                <Form.Control value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search For a Particular Country"/>
                <button onClick={(e) =>getCountrycases(input)} className="btn btn-primary">Search</button>
            </div>
          </Navbar.Collapse>

        </div>
      </Navbar>
      {/*graph component*/}
      <Graph title={title} casesKey={keyLabelsCases} casesValues={casesglobal} deathsKey={keyLabelsDeath}  deathValues={deathsglobal} />
      <div className="bg-dark p-4 fixed-bottom">
        <p className="text-white text-end">Data Provided By disease.sh</p>
      </div>
    </div>
    )
}