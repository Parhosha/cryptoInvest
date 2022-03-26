import { TIME_TOOLTIP } from '../../../constants/words';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import Wrapper from '../../common/wrapper/Wrapper';
import { getData } from "../../Redux/Chart/ChartReducer"
import { action } from "../../Redux/Form/FormReducer"
import { initialValues } from './config';
import { useNavigate } from 'react-router-dom';
import formOptions from '../../../constants/params';

import style from './Forms.module.sass'

interface Values {
  start: string;
  end: string;
  dayOfWeek: string;
  currency: string;
  amount: string;
  time: string;
}


const Forms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <Wrapper className={style.forms}>
      <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values
        ) => {

          setTimeout(async () => {
            dispatch(action.setParameters(values))
            navigate('/Statistic');
            await dispatch(getData(values.start, values.end, values.currency, values.time, values.dayOfWeek))


            // setSubmitting(false);
          }, 500);
        }}
      >
        <Form className={style.form}>
          <label htmlFor="start">Start</label>
          <Field id="start" name="start" placeholder="2022-01-30" type="date" required />

          <label htmlFor="end">End</label>
          <Field id="end" name="end" placeholder="2022-02-08" type="date" required />

          <label htmlFor="amount">Amount</label>
          <Field id="amount" name="amount" placeholder="100" type="text" required />

          <label htmlFor="dayOfWeek">Select Day</label>
          <Field as="select" id="dayOfWeek" name="dayOfWeek">
            {formOptions('dayOfWeek')}
          </Field>

          <label htmlFor="time" data-tip={TIME_TOOLTIP}>Time</label>
          <Field as="select" id="time" name="time" data-tip={TIME_TOOLTIP}>
            {formOptions('time')}
          </Field>

          <label htmlFor="currency">Currency</label>
          <Field as="select" id="currency" name="currency">
            {formOptions('currency')}
          </Field>

          <button type="submit" className={style.button}>Get</button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default Forms;