import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    amount: Yup.string()
      .min(3, 'Too Short!')
      .max(6, 'Too Long!')
      .required('Required'),
   
  });

export const initialValues = {
    start: '2022-01-30',
    end: '2022-02-08',
    period: '0',
    currency: 'USDT',
    amount: '100',
    time: '10:00'
}