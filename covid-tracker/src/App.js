import React,{useState,useEffect} from 'react';
import {Navbar} from 'react-bootstrap';
import Graph from "./components/Graph.js";



const keyLabelsCases = []
const keyLabelsDeath = []
const daysFilterCases = (dates) =>{
  for(var i=0;i<dates.length;i++){
    var val = dates[i].slice(2,4)
    keyLabelsCases.push(val);

  }
}
const daysFilterDeath = (dates) =>{
  for(var i=0;i<dates.length;i++){
    var val = dates[i].slice(2,4)
    keyLabelsDeath.push(val);

  }
}

export default function App(){

  const [casesglobal, setCasesglobal] = useState([]);
  const [deathsglobal, setDeathsglobal] = useState([]);
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
      <Navbar bg="dark" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand className="d-flex align-items-center">
          <img className="" src="https://img.icons8.com/external-others-phat-plus/50/000000/external-corona-covid-19-color-line-others-phat-plus-13.png"/>
          <h1 className="fs-5">Covid-19 Tracker</h1>
          </Navbar.Brand>
        </div>
      </Navbar>
      {/*graph component*/}
      <Graph casesKey={keyLabelsCases} casesValues={casesglobal} deathsKey={keyLabelsDeath}  deathValues={deathsglobal} />
    </div>
    )
}