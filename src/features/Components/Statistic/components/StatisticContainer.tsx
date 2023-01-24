import React from "react";
import { useSelector } from "react-redux";
import { selectAnalyze, selectParameter } from "../../../helpers/selectors";
import { createSelector } from "reselect";
import Info from "./info";
import Loader from "../../../common/loader";
import Wrapper from "../../../common/wrapper";

import style from "../index.module.sass"

export default function StatisticContainer() {
  const state = useSelector((state) => state);
  const selectData = createSelector(selectParameter, selectAnalyze);
  const { parameters, lastDay, wallet, profitStyle } = selectData(state);

  return (
    <Wrapper className={style.info}>
      {wallet ? (
        <Info
          parameters={parameters}
          lastDay={lastDay}
          wallet={wallet}
          profitStyle={profitStyle}
        />
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}
