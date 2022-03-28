import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Wrapper from '../../../common/wrapper';
import { getData } from "../../../Redux/Chart/ChartReducer"
import action from "../../../Redux/Form/FormActions"
import { initialValues } from '../config';
import { useNavigate } from 'react-router-dom';
import { validationDates } from '../validation';
import { TForm } from '../../../../features/Redux/Form/FormReducer';
import { ROUTE } from '../../../../constants/routes';

import style from '../index.module.sass'


type TFormContainer = {
  notify: () => void,
  children: JSX.Element
}

const FormContainer = ({ notify, children }: TFormContainer) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Wrapper className={style.forms}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: TForm) => {
          if (validationDates(values.start, values.end)) {
            dispatch(action.setParameters(values))
            dispatch(getData(values.start, values.end, values.currency, values.time, values.dayOfWeek))
            navigate(ROUTE.STATISTIC);
          } else {
            notify()
          }
        }}
      >
        {children}
      </Formik>
    </Wrapper>
  );
};

export default FormContainer;