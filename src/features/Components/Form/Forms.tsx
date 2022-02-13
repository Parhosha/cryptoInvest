import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../common/wrapper/Wrapper';
import { getData } from "../../Redux/Chart/ChartReducer"
import { action } from "../../Redux/Form/FormReducer"
import style from './Forms.module.sass'

interface Values {
  start: string;
  end: string;
  period: string;
  currency: string;
  amount: string;
}


const Forms = ({ handleState }) => {
 
 const dispatch = useDispatch()
    return (
      <Wrapper className={style.forms}>
          <Formik
        initialValues={{
          start: '2022-01-30',
          end: '2022-02-08',
          period: '0',
          currency: 'USDT',
          amount: '100'
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          
          setTimeout(() => {
            dispatch(action.setParameters(values))
            dispatch(getData(values.start, values.end, values.currency))
            setSubmitting(false);
            handleState()
          }, 500);
        }}
      >
        <Form className={style.form}>
          <label htmlFor="start">Start</label>
          <Field id="start" name="start"  placeholder="2022-01-30" type="date" required/>

          <label htmlFor="end">End</label>
          <Field id="end" name="end" placeholder="2022-02-08" type="date" required/>

          <label htmlFor="amount">Amount</label>
          <Field id="amount" name="amount" placeholder="100" type="text" required/>
          
          <label htmlFor="period">Select Day</label>
          <Field as="select" id="period" name="period">
             <option value="0">Sunday</option>
             <option value="1">Monday</option>
             <option value="2">Tuesday</option>
             <option value="3">Wednesday</option>
             <option value="4">Thursday</option>
             <option value="5">Friday</option>
             <option value="6">Saturday</option>
           </Field>


          <label htmlFor="currency">Currency</label>
          <Field as="select" id="currency" name="currency">
             <option value="USDT">USD</option>
             <option value="UAH">UAH</option>
             <option value="RUB">RUB</option>
           </Field>

          <button type="submit" className={style.button}>Get</button>
        </Form>
      </Formik>
      </Wrapper>
    );
};

export default Forms;