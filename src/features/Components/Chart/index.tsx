import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Loader from '../../common/loader';
import { useState, useEffect } from 'react';
import { getChart } from '../../../features/helpers/selectors';
import getChartOptions from './options.js';
import Wrapper from '../../common/wrapper';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js';

import style from "./index.module.sass"


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);



export interface IOptionsState {
	options: ChartOptions<any> | null;
	params: {
		labels: Array<string>,
		datasets: Array<
			{
				label: string,
				data: Array<string>,
				borderColor: string,
				backgroundColor: string,
			}
		>,
	} | null;
}




const Chart = () => {
	const chart = useSelector(getChart)
	const [Options, setOptions] = useState<IOptionsState>({ options: null, params: null })

	useEffect(() => {
		if (chart.history.length) {
			const { options, params } = getChartOptions(chart.history, `BTC - ${chart.currency}`);
			setOptions({ options, params })
		}

	}, [chart])


	return (
		<Wrapper className={style.chart}>
			{Options.params ?
				<Line options={Options.options} data={Options.params} />
				: <Loader />}
		</Wrapper>
	);
};

export default Chart;