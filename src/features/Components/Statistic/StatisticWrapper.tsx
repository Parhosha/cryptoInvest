import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IForm } from '../../Redux/Form/FormReducer';
import { calculatePeriod } from '../../helpers/pipeAnalytics';
import { useNavigate } from 'react-router-dom';
import Statistic from './Statistic';

import style from "./Statistic.module.sass"
import Chart from '../Chart/Chart';


const selectParameter = (store: any) => ({ form: store.FormReducer, history: store.ChartReducer.history, historyHours: store.ChartReducer.historyHours })

interface IWallet {
    times: number | null;
    account: number | null;
}

const StatisticWrapper = () => {
    const navigate = useNavigate();

    const state = useSelector(selectParameter)
    const [parameters, setParameters] = useState<IForm | null>(null)
    const [wallet, setWallet] = useState<IWallet>({ times: null, account: null })
    const [lastDay, setLastDay] = useState(null)
    const [profit, setProfit] = useState<any>(null)

    useEffect(() => {

        if (state.history.length) {

            setParameters({ ...state.form })

            let history = state.form.time !== 'Average' ? state.historyHours : state.history
            let endOfPeriodPrice = state.history[state.history.length - 1]
            endOfPeriodPrice = (endOfPeriodPrice.rate + endOfPeriodPrice.rate) / 2
            setLastDay(endOfPeriodPrice)

            const calculateResult = calculatePeriod(state.form.start, state.form.end, state.form.dayOfWeek, history)
            setWallet({ times: calculateResult.buyCount.length, account: calculateResult.wallet })

            const styleProfit = calculateResult.wallet * endOfPeriodPrice > calculateResult.buyCount.length * state.form.amount
            setProfit(styleProfit)

        }

    }, [state])

    return <>
        <Chart />
        <Statistic
            parameters={parameters}
            wallet={wallet}
            lastDay={lastDay}
            profitStyle={profit ? style.plus : style.minus} />

        <button className={style.backBtn} onClick={() => navigate('/')}>
            Back
        </button>
    </>
};

export default StatisticWrapper;