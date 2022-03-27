import { FETCH_HOURS } from "../../../constants/values"
import { Dispatch, AnyAction } from 'redux';
import { getCryptoHours } from "./ChartActions";
import { calculatePeriod } from "../../helpers/pipeAnalytics";

 export const getHoursData = async (
    start:string,
    end: string,
    dayOfWeek:string,
    currency: string,
    time: string,
    dispatch: Dispatch<AnyAction>) => {
  
    const days = calculatePeriod(start, end, dayOfWeek)

    for await(let day of days.buyCount){
        const serverTimeFormat = new Date(`${day}T${time}`)
        await dispatch(getCryptoHours(currency, FETCH_HOURS, serverTimeFormat.toISOString()))
    }

    return {type: `${FETCH_HOURS}_SUCCESS`}

}
