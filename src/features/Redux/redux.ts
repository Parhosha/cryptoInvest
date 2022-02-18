import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios'
import thunk from 'redux-thunk';

import axiosMiddleware from 'redux-axios-middleware';
import FormReducer from './Form/FormReducer';
import ChartReducer from './Chart/ChartReducer';

// https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2022-01-30T19:00:00.0000000Z
// 'https://api.coindesk.com/v1/bpi/'
// 4311FC40-9E67-4237-9C7D-FE8B89DB659A
// E60C4CE7-E670-4EF8-BB4E-FEA2F1FE0916
// 0DA20B70-5E61-49B7-96E9-E3196139195E
const client = axios.create({ baseURL: 'https://rest.coinapi.io/v1/', headers: {'X-CoinAPI-Key': '0DA20B70-5E61-49B7-96E9-E3196139195E'}, responseType: 'json'});
const reducers = combineReducers({ FormReducer, ChartReducer});

export const store = createStore(
	reducers,
	applyMiddleware(axiosMiddleware(client), thunk)
);

