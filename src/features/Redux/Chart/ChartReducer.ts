/* eslint-disable @typescript-eslint/ban-types */
import { Dispatch, AnyAction } from 'redux';

interface IForm {
	history: Array<object> | null;
  currency: string
}

const formState: IForm = { history: [], currency: '' };

export default function ChartReducer(state = formState, action: any) {
	switch (action.type) {
		case 'FETCH_HISTORY_PERIOD_SUCCESS':
            const currency = action.payload.config.url.slice(16,2)
           
            return {...state, history: [...action.payload.data], currency: currency}

		default:
			return state;
	}
}


export function getData(start: string, end: string, currency: string, periodId?: string) {
	return async function (dispatch: Dispatch<AnyAction>) {
		try {
          await dispatch(getCrypto(start, end, currency, periodId))
		} catch (e) {
			console.log(e);
		}
	};
}
export const getCrypto = (from: string, to: string, currency: string, periodId: string = '1DAY') =>({
    type: 'FETCH_HISTORY_PERIOD',

    payload: {
      request: {
        url: `BINANCE_SPOT_BTC_${currency}/history?period_id=${periodId}&time_start=${from}&time_end=${to}`,
        method: 'GET',
      },
    },
  })
 