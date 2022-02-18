/* eslint-disable @typescript-eslint/ban-types */
import { FETCH_DAYS, FETCH_HOURS } from '../../../constants/words';
import { Dispatch, AnyAction } from 'redux';
import { getCryptoDay } from './ChartActions';
import { getHoursData } from './helper';

interface IChart {
	history: Array<object> ;
  historyHours: Array<object> ;
  currency: string;
}

const chartState: IChart = { history: [], historyHours: [], currency: '' };

export default function ChartReducer(state = chartState, action: any) {

	switch (action.type) {
		case `${FETCH_DAYS}_SUCCESS`:

        const currency = action.payload.config.url.slice(16,2)
        const uniFormat = action.payload.data.map((el: any) =>({ time: el.time_open, rate: Math.round((el.price_open + el.price_close)/2) }))
        return {...state, history: [...uniFormat], currency: currency}

    case `${FETCH_HOURS}_SUCCESS`:
          
        let tmp: any  = new Date(action.payload.data.time)
        tmp = tmp.setHours(tmp.getHours() + 2)
        tmp = `${new Date(tmp).toISOString()}`

        return {...state, historyHours: [...state.historyHours, {...action.payload.data, time: tmp}]}

		default:
			return state;
	}
}

export function getData(start: string, end: string, currency: string, periodId: string, dayOfWeek: string) {
	return async function (dispatch: Dispatch<AnyAction>) {
  
    try {

        if(periodId !== 'Average')
          await getHoursData(start, end, dayOfWeek, currency, periodId, dispatch)        
          
          return await dispatch(getCryptoDay(start, end, currency, '1DAY', FETCH_DAYS ))
        
		} catch (e) {
			console.log(e);
		}
	};
}

