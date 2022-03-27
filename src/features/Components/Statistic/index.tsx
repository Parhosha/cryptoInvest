import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../constants/routes';
import { BACK_BTN } from '../../../constants/values';
import StatisticContainer from './components/StatisticContainer';
import Chart from '../Chart';

import style from "./index.module.sass"


const Statistic = () => {
    const navigate = useNavigate()

    return <>
        <Chart />
        <StatisticContainer />

        <button className={style.backBtn} onClick={() => navigate(ROUTE.DEFAULT)}>
            {BACK_BTN}
        </button>
    </>
};

export default Statistic;
