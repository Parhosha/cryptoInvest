import { calculatePeriod } from './pipeAnalytics';

export const getChart = (store: any) => store.ChartReducer

export const selectParameter = (store: any) => ({ form: store.FormReducer, history: store.ChartReducer.history, historyHours: store.ChartReducer.historyHours })

export const selectAnalyze = (state: any) => {
    let parameters = null;
    let lastDay = null;
    let wallet = null;
    let profitStyle = '';

    if (state.history.length) {

        parameters = { ...state.form }
  
        let history = state.form.time !== 'Average' ? state.historyHours : state.history
        let endOfPeriodPrice = state.history[state.history.length - 1]
        endOfPeriodPrice = (endOfPeriodPrice.rate + endOfPeriodPrice.rate) / 2
        lastDay = endOfPeriodPrice
  
        const calculateResult = calculatePeriod(state.form.start, state.form.end, state.form.dayOfWeek, history)
        wallet = { times: calculateResult.buyCount.length, account: calculateResult.wallet }
  
        profitStyle = 
            (calculateResult.wallet * endOfPeriodPrice) > (calculateResult.buyCount.length * state.form.amount) 
                ? 'positive' : 'negative'
  
      }
      return {parameters, lastDay, wallet, profitStyle}
}
