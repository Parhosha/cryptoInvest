import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../common/loader/Loader';
import { IForm } from '../../Redux/Form/FormReducer';
import Wrapper from '../../common/wrapper/Wrapper';
import { calculatePeriod } from '../../helpers/pipeAnalytics';
import { daysOfWeek } from '../../../constants/params';

import style from "./Statistic.module.sass"

const selectParameter = ( store: any ) => ({ form: store.FormReducer, history: store.ChartReducer.history })

interface IWallet {
	times: number | null;
	account: number | null;
}

const Statistic = () => {
    const data = useSelector(selectParameter)
    const [parameters, setParameters] = useState<IForm | null>(null)
    const [wallet, setWallet] = useState <IWallet>({times: null, account: null})
    const [lastDay, setLastDay] = useState(null)
    const [profit, setProfit] = useState(false)

    useEffect(()=>{

        if(data.history.length ){
            
            const calculateResult = calculatePeriod(data.form.start, data.form.end, data.form.period, data.history) 
            setParameters({ ...data.form})
            setWallet({times: calculateResult.buyCount, account: calculateResult.wallet})

            let endOfPeriodPrice = data.history[data.history.length - 1]
            endOfPeriodPrice = (endOfPeriodPrice.price_high + endOfPeriodPrice.price_low) / 2
            setLastDay(endOfPeriodPrice)

            const styleProfite = calculateResult.wallet * endOfPeriodPrice >  calculateResult.buyCount * data.form.amount
            setProfit(styleProfite)

        }
        
    },[data])
    return (
        <Wrapper className={style.Statistic}>
                {parameters ? <p>Day of buying: {daysOfWeek[+parameters.period] + ' '} <br />
                    Amount: {`${parameters.amount}  ${parameters.currency}`} <br /> 
                    Period:  from {parameters.start} to {parameters.end} <br />
                    Sessions: {wallet.times} buys equal <b>{wallet.account!.toString().slice(0,6)}</b> BTC <br />
                    In: {parameters.end} it will coast: <b className={profit ? style.plus : style.minus}> { wallet.account! * lastDay! } </b></p>: <Loader />}
            
        </Wrapper>
    );
};

export default Statistic;