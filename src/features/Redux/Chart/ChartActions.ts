
export const getCryptoDay = (from: string, to: string, currency: string, period: string,  type: string, time?: string) =>({
    type: type,
    // TODO: change api to reduce amount of queries
    payload: {
      request: {
        // url: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency.slice(0, -1)}`,
        url: `ohlcv/BINANCE_SPOT_BTC_${currency}/history?period_id=${period}&time_start=${from}&time_end=${to}`,
        method: 'GET',
      },
      // period: time || period,

    },
  })

export const getCryptoHours = (currency: string,  type: string, time: string) =>({
    type: type,
    payload: {
      request: {
        url:`exchangerate/BTC/${currency}?time=${time}`,
        method: 'GET',
      },
      period: time,

    },
  })
