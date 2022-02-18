export const getCryptoDay = (from: string, to: string, currency: string, period: string,  type: string, time?: string) =>({
    type: type,

    payload: {
      request: {
        url: `ohlcv/BINANCE_SPOT_BTC_${currency}/history?period_id=${period}&time_start=${from}&time_end=${to}`,
        method: 'GET',
      },
      period: time || period,

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