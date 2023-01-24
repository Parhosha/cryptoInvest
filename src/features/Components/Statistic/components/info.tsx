import React from "react";
import { AMOUNT, DAY_OF_BUYING, END, PERIOD, SESSIONS } from "../../../../constants/values";
import { daysOfWeek } from "../../../../constants/params";

import style from "../index.module.sass";

type TInfo = {
  parameters: {
    dayOfWeek: string,
    amount: string,
    currency: string,
    start: string,
    end: string
  },
  wallet: {
    account: number,
    times: number,
  },
  lastDay: number,
  profitStyle: string,
}

const Info = ({ parameters, wallet, lastDay, profitStyle }: TInfo) => {
  return <div className={style.content}>
    <ul>
      <li>
        <b>{DAY_OF_BUYING}</b>
        <p>{daysOfWeek[+parameters.dayOfWeek]}</p>
      </li>
      <li>
        <b>{AMOUNT}:</b>
        <p> {`${parameters.amount}  ${parameters.currency}`} </p>
      </li>
      <li>
        <b>{PERIOD}</b>
        <p>{`from ${parameters.start.slice(5)} to  ${parameters.end.slice(5)}`}</p>
      </li>
      <li>
        <b>{SESSIONS}</b> <p>{wallet.times}</p> buys equal
        <b> {wallet.account!.toString().slice(0, 6)}</b> BTC
      </li>
      <li>
        <b>{END}:</b> at <b> {parameters.end.slice(5)}</b> wallet will coast:
        <pre className={style[profitStyle]}>
          {wallet.account! * lastDay! + parameters.currency}
        </pre>
      </li>
    </ul>
  </div>
};

export default Info;
