export const getCrypto = (from: string, to: string) =>({
  type: 'FETCH_HISTORY_PERIOD',
  payload: {
    request: {
      url: `historical/close.json?start=${from}&end=${to}&currency=USD`,
      method: 'GET',
    },
  },
})
