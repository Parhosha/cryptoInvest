import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios'
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import FormReducer from './Form/FormReducer';
import ChartReducer from './Chart/ChartReducer';

const client = axios.create({ baseURL: 'https://rest.coinapi.io/v1/', headers: {'X-CoinAPI-Key': ' 0DA20B70-5E61-49B7-96E9-E3196139195E'}, responseType: 'json'});

const reducers = combineReducers({ FormReducer, ChartReducer});

export const store = createStore(
	reducers,
	applyMiddleware(axiosMiddleware(client), thunk)
);

