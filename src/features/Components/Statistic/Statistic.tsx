import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../../common/wrapper/Wrapper';
import { calculatePeriod } from '../../helpers/pipeAnalytics';

import style from "./Statistic.module.sass"

const selectParameter = ( store: any ) => ({ form: store.FormReducer, history: store.ChartReducer.history })

const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']



const Statistic = () => {
    const data = useSelector(selectParameter)
    const [parameters, setParameters] = useState(null)
    const [wallet, setWallet] = useState(null)
    const [lastDay, setLastDay] = useState(null)

    useEffect(()=>{

        if(data.history.length ){
            
            const times = calculatePeriod(data.form.start, data.form.end, data.form.period, data.history) 
            setParameters({...parameters, ...data.form})
            setWallet({times: times.buyCount, account: times.wallet})
            let endOfPeriodPrice = data.history[data.history.length - 1]
            endOfPeriodPrice = (endOfPeriodPrice.price_high + endOfPeriodPrice.price_low) / 2
            setLastDay(endOfPeriodPrice)
        }
        
    },[data])
    return (
        <Wrapper className={style.Statistic}>
                {parameters && wallet &&<p>If buy each {parameters && daysOfWeek[+parameters.period] + ' '} 
                    BTC on {`${parameters.amount}  ${parameters.currency}`} <br /> in period from {parameters.start} to {parameters.end}
                    it will spent {wallet.times * 100} {parameters.currency} equal to {wallet.account} BTC 
                    and if sell in {parameters.end} it will coast: { lastDay && wallet.account * lastDay } </p>}
            
        </Wrapper>
    );
};

export default Statistic;