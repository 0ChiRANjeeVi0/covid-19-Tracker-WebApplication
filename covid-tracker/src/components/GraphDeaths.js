import React from 'react';
import {Bar} from 'react-chartjs-2';
import 'chart.js/auto';

var newdeaths = 0;
const options ={
	 plugins: {
            legend: {
                display: false,
            }
        }
}

export default function GraphDeaths(props){
	const calNewdeaths = () =>{
		newdeaths = props.deathValue[4]- props.deathValue[3]
	}
	calNewdeaths();
	const labels = props.deathKey
	const data = {
	labels:labels,
	datasets:[{
		data:props.deathValue,
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

		<div className="">
			<h4 className="text-center">Total Number Of Deaths Due To Covid Deaths {props.title}</h4>
			<p className="text-center">Historical data for past 6 days</p>
			<Bar data={data} options={options} />
			<h5 className="text-center">{newdeaths} Deaths Detected In Last 24 Hours</h5>
		</div>
	)
}