import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Loader from '../../common/loader/Loader';
import { useState, useEffect } from 'react';
import getChartOptions from './options.js';
import Wrapper from '../../common/wrapper/Wrapper';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import style from "./Chart.module.sass"


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);


const getChart = (store: any) => store.ChartReducer

export interface IOptionsState {
	options: object | null;
	params: object | null;
  }

const Chart = () => {
	const chart = useSelector(getChart)
	const [Options, setOptions] = useState<IOptionsState> ({options: null, params: null})

	useEffect(() => {
		if(chart.history.length){
		const { options, params } = getChartOptions(chart.history, `BTC - ${chart.currency}`);
		setOptions({options, params})
	}

	}, [chart])
	

	return(
		<Wrapper className={style.Chart}>
            {Options.params ? 
				<Line options={Options.options || {}} data={Options.params as any} /> 
				: <Loader />}
		</Wrapper> 
    );
};

export default Chart;