import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios'
import thunk from 'redux-thunk';

import axiosMiddleware from 'redux-axios-middleware';
import FormReducer from './Form/FormReducer';
import ChartReducer from './Chart/ChartReducer';


// const client = axios.create({ baseURL: 'https://api.coindesk.com/v1/bpi/', responseType: 'json'});
const client = axios.create({ baseURL: 'https://rest.coinapi.io/v1/ohlcv', headers: {'X-CoinAPI-Key': '4311FC40-9E67-4237-9C7D-FE8B89DB659A'}, responseType: 'json'});
const reducers = combineReducers({ FormReducer, ChartReducer});

export const store = createStore(
	reducers,
	applyMiddleware(axiosMiddleware(client), thunk)
);

