/* eslint-disable @typescript-eslint/ban-types */
import { FETCH_DAYS, FETCH_HOURS, SET_DEFAULT_CHART } from "../../../constants/values";
import { Dispatch, AnyAction } from "redux";
import actions from "./ChartActions";
import { getHoursData } from "./service";
import { formatDate } from "../../helpers/pipeAnalytics";
import { TAction, TData } from "../../../types";
import { isoConvertData } from "../../../features/helpers/pipeDates";

export type TChart = {
  history: Array<object>;
  historyHours: Array<object>;
  currency: string;
};

const initChartState: TChart = { history: [], historyHours: [], currency: "" };
const chartState: TChart = {...initChartState };

export default function ChartReducer(state = chartState, action: TAction) {
  switch (action.type) {
    case `${FETCH_DAYS}_SUCCESS`:
      const currency = action.payload.config.url.slice(16, 2);
      const uniFormat = action.payload.data.map((el: TData) => ({
        time: el.time_open,
        rate: Math.round((el.price_open + el.price_close) / 2),
      }));

      return {
        ...state,
        history: [...uniFormat],
        currency: currency,
        status: "finish",
      };

    case `${FETCH_HOURS}_SUCCESS`:
      const time = isoConvertData(action.payload.data.time);

      return {
        ...state,
        historyHours: [
          ...state.historyHours,
          { ...action.payload.data, time: time },
        ],
      };

      case SET_DEFAULT_CHART:
        return initChartState

    default:
      return state;
  }
}

export function getData(
  start: string,
  end: string,
  currency: string,
  periodId: string,
  dayOfWeek: string
) {
  return async function (dispatch: Dispatch<AnyAction>) {
    try {
      if (periodId !== "Average")
        await getHoursData(start, end, dayOfWeek, currency, periodId, dispatch);

      let endPlusDay = formatDate(new Date(new Date(end).getTime() + 86400000));
      await dispatch(
        actions.getCryptoDay(start, endPlusDay, currency, "1DAY", FETCH_DAYS)
      );
    } catch (e) {
      console.error(e);
    }
  };
}
