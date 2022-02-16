// import { Formik, Field, Form, FormikHelpers } from 'formik';
// import { useDispatch } from 'react-redux';
// import Wrapper from '../../common/wrapper/Wrapper';
// import { getData } from "../../Redux/Chart/ChartReducer"
// import { action } from "../../Redux/Form/FormReducer"
// import { initialValues } from './config';
// import style from './Forms.module.sass'

// interface Values {
//   start: string;
//   end: string;
//   period: string;
//   currency: string;
//   amount: string;
//   time: string;
// }
// interface IForms{
//   handleState: () => void;
// }

// const timesOptions = () => {
//   const times = []
//   for(let i =0; i < 24; i++){
//     times.push(<option value={`${i}:00`} key={i}>{i +`:00`}</option>)
//   }
//   return times
// }


// const Forms = ({ handleState }:IForms ) => {
 
//  const dispatch = useDispatch()
//     return (
//       <Wrapper className={style.forms}>
//           <Formik
//         initialValues={initialValues}
//         onSubmit={(
//           values: Values,
//           { setSubmitting }: FormikHelpers<Values>
//         ) => {
          
//           setTimeout(async () => {
//             dispatch(action.setParameters(values))
//             const { type }: = await dispatch(getData(values.start, values.end, values.currency))
//             if(type! === 'FETCH_HISTORY_PERIOD_SUCCESS') handleState()
//             setSubmitting(false);
//           }, 500);
//         }}
//       >
//         <Form className={style.form}>
//           <label htmlFor="start">Start</label>
//           <Field id="start" name="start"  placeholder="2022-01-30" type="date" required/>

//           <label htmlFor="end">End</label>
//           <Field id="end" name="end" placeholder="2022-02-08" type="date" required/>

//           <label htmlFor="amount">Amount</label>
//           <Field id="amount" name="amount" placeholder="100" type="text" required/>
          
//           <label htmlFor="period">Select Day</label>
//           <Field as="select" id="period" name="period">
//              <option value="0">Sunday</option>
//              <option value="1">Monday</option>
//              <option value="2">Tuesday</option>
//              <option value="3">Wednesday</option>
//              <option value="4">Thursday</option>
//              <option value="5">Friday</option>
//              <option value="6">Saturday</option>
//            </Field>

//            <label htmlFor="time">Time</label>
//            <Field as="select" id="time" name="time">
//              {timesOptions()}
//            </Field>


//           <label htmlFor="currency">Currency</label>
//           <Field as="select" id="currency" name="currency">
//              <option value="USDT">USD</option>
//              <option value="UAH">UAH</option>
//              <option value="RUB">RUB</option>
//            </Field>

//           <button type="submit" className={style.button}>Get</button>
//         </Form>
//       </Formik>
//       </Wrapper>
//     );
// };

// export default Forms;

import { FHP } from '../../../constants/status';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import Wrapper from '../../common/wrapper/Wrapper';
import { getData } from "../../Redux/Chart/ChartReducer"
import { action } from "../../Redux/Form/FormReducer"
import { initialValues } from './config';
import formOptions from '../../../constants/params';

import style from './Forms.module.sass'

interface Values {
  start: string;
  end: string;
  period: string;
  currency: string;
  amount: string;
  time: string;
}
interface IForms{
  handleState: () => void;
}


const Forms = ({ handleState }:IForms ) => {
 
 const dispatch = useDispatch()
    return (
      <Wrapper className={style.forms}>
          <Formik
        initialValues={initialValues}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          
          setTimeout(async () => {
            dispatch(action.setParameters(values))
            const { type }: any = await dispatch(getData(values.start, values.end, values.currency))
            if(type! === `${FHP}_SUCCESS`) handleState()
            setSubmitting(false);
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
            {formOptions('period')}
           </Field>

           <label htmlFor="time">Time</label>
           <Field as="select" id="time" name="time">
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