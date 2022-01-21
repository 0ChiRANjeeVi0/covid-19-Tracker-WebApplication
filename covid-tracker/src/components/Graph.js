import React,{useState} from 'react';
import {Bar} from 'react-chartjs-2';
import 'chart.js/auto';
import GraphDeaths from './GraphDeaths.js';

var newcase = 0;
const options ={
	 plugins: {
            legend: {
                display: false,
            }
        },
}
export default function Graph(props){
	const calNewcases = () =>{
		newcase = props.casesValues[5]-props.casesValues[4]	}
	calNewcases();

	const labels = props.casesKey
	const data = {
	labels:labels,
	datasets:[{
		data:props.casesValues,
		backgroundColor: [
	      'rgba(255, 99, 132, 0.2)',
	      'rgba(255, 159, 64, 0.2)',
	      'rgba(255, 205, 86, 0.2)',
	      'rgba(75, 192, 192, 0.2)',
	      'rgba(54, 162, 235, 0.2)',
	      'rgba(153, 102, 255, 0.2)',
	      'rgba(201, 203, 207, 0.2)'
    	],
    	borderColor:[
    	  'rgb(255, 99, 132)',
	      'rgb(255, 159, 64)',
	      'rgb(255, 205, 86)',
	      'rgb(75, 192, 192)',
	      'rgb(54, 162, 235)',
	      'rgb(153, 102, 255)',
	      'rgb(201, 203, 207)'
    	],
    	borderWidth:1,
	}]
}
	return (
		<div className="mt-4 pb-4 border border-top-0 border-primary">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6">
						<h4 className="text-center">Total Number of Positive Covid-19 Cases Around The Globe</h4>
						<Bar data={data} options={options} />
						<h5 className="text-center">{newcase} Cases Detected In Last 24 Hours</h5>
					</div>
					<div className="col-md-6 mt-4 mt-md-0">
						<GraphDeaths deathKey={props.deathsKey}  deathValue={props.deathValues}/>
					</div>
				</div>
			</div>
		</div>

	)
}