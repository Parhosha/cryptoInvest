export const getCryptoDay = (from: string, to: string, currency: string, period: string,  type: string, time?: string) =>({
    type: type,

    payload: {
      request: {
        url: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency.slice(0, -1)}`,
        // url: `ohlcv/BINANCE_SPOT_BTC_${currency}/history?period_id=${period}&time_start=${from}&time_end=${to}`,
        method: 'GET',
        // headers: {
        //   'X-CoinAPI-Key': 'E60C4CE7-E670-4EF8-BB4E-FEA2F1FE0916',
        // }
      },
      // period: time || period,

    },
  })

export const getCryptoHours = (currency: string,  type: string, time: string) =>({
    type: type,
    payload: {
      request: {
        url:`exchangerate/BTC/${currency}?time=${time}`,
        headers: {
          'X-CoinAPI-Key': 'E60C4CE7-E670-4EF8-BB4E-FEA2F1FE0916',
        },
        method: 'GET',
      },
      period: time,

    },
  })

// 4311FC40-9E67-4237-9C7D-FE8B89DB659A
// E60C4CE7-E670-4EF8-BB4E-FEA2F1FE0916
// 0DA20B70-5E61-49B7-96E9-E3196139195E