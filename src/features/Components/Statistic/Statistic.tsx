import React from 'react'
import Wrapper from '../../common/wrapper/Wrapper';
import { daysOfWeek } from '../../../constants/params';
import Loader from '../../common/loader/Loader';

import style from "./Statistic.module.sass"

const Statistic = ({ parameters, wallet, lastDay, profitStyle}: any) => {

  return <Wrapper className={style.Statistic}>
     { wallet.account ? <div className={style.content}>
      <div><p>Day of buying: <i>{daysOfWeek[+parameters.dayOfWeek]}</i></p> </div>
      <div><p>Amount: <i> {`${parameters.amount}  ${parameters.currency}`} </i></p> </div>
      <div><p>Period: from <i>{`${parameters.start} to ${parameters.end}`}</i> <br /></p> </div>
      <div><p>Sessions: <i>{wallet.times}</i> buys equal 
      <b>{wallet.account!.toString().slice(0,6)}</b> BTC <br /></p></div>
      <div><p>By the: <i>{parameters.end}</i> it will coast: 
        <b className={profitStyle}> 
          {wallet.account! * lastDay! +parameters.currency} 
        </b></p></div>
        </div> : <Loader />}
      </Wrapper>
  }

export default Statistic