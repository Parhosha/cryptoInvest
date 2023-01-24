import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants/routes';
import { BACK_BTN } from '../../../constants/values';
import StatisticContainer from './components/StatisticContainer';
import { useDispatch } from 'react-redux';
import formAction from '../../../features/Redux/Form/FormActions';
import chartAction from '../../../features/Redux/Chart/ChartActions';
import Chart from '../Chart';

import style from "./index.module.sass"



const Statistic = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleNavigate = () => {
        dispatch(formAction.setDefault())
        dispatch(chartAction.setDefault())
        navigate(ROUTE.DEFAULT)
    }

    return <>
        <Chart />
        <StatisticContainer />

        <button className={style.backBtn} onClick={() => handleNavigate()}>
            {BACK_BTN}
        </button>
    </>
};

export default Statistic;
