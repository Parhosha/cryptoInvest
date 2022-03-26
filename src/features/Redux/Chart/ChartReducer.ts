/* eslint-disable @typescript-eslint/ban-types */
import { FETCH_DAYS, FETCH_HOURS } from '../../../constants/words';
import { Dispatch, AnyAction } from 'redux';
import { getCryptoDay } from './ChartActions';
import { getHoursData } from './helper';
import { formatDate } from '../../helpers/pipeAnalytics';

interface IChart {
	history: Array<object> ;
  historyHours: Array<object> ;
  currency: string;
}

const chartState: IChart = { history: [], historyHours: [], currency: '' };

export default function ChartReducer(state = chartState, action: any) {

	switch (action.type) {
		case `${FETCH_DAYS}_SUCCESS`:
      console.log(action.payload)
        const currency = action.payload.config.url.slice(16,2)
        const uniFormat = action.payload.data.map(
          (el: any) =>({ time: el.time_open,
            rate: Math.round((el.price_open + el.price_close)/2) 
          }))
        
      return {...state, history: [...uniFormat], currency: currency, status: 'finish'}

    case `${FETCH_HOURS}_SUCCESS`:   
          console.log(action.payload.data)
        const time = isoConvertData(action.payload.data.time)

        return {...state, historyHours: [...state.historyHours, {...action.payload.data, time: time}]}

		default:
			return state;
	}
}

export function getData(start: string, end: string, currency: string, periodId: string, dayOfWeek: string) {
	return async function (dispatch: Dispatch<AnyAction>) {
  
    try {

        if(periodId !== 'Average')
          await getHoursData(start, end, dayOfWeek, currency, periodId, dispatch)       
          
          let endPlusDay = formatDate(new Date(new Date(end).getTime() + 86400000))
          await dispatch(getCryptoDay(start, endPlusDay, currency, '1DAY', FETCH_DAYS ))
        
		} catch (e) {
			console.log(e);
		}
	};
}

export function isoConvertData(time: any){

  let res: any  = new Date(time)
    res = res.setHours(res.getHours() + 2)
    res = `${new Date(res).toISOString()}`

  return res
}