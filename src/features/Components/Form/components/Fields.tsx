import React from 'react'
import {
    AMOUNT,
    CURRENCY,
    FIELD_CURRENCY,
    FIELD_DAY_OF_WEEK,
    FIELD_END, FIELD_START,
    DATE, DAY_OF_WEEK, END, FIELD_AMOUNT,
    FIELD_TIME,
    SELECT,
    START,
    TEXT, TIME, TIME_TOOLTIP, FIELD_SUBMIT, FORM_BTN
} from '../../../../constants/values';
import { Field, Form } from 'formik';

import style from '../index.module.sass'

type TFields = {
    day: Array<JSX.Element>,
    time: Array<JSX.Element>,
    currency: Array<JSX.Element>
}

export default function Fields({ day, time, currency }: TFields) {

    return (
        <Form className={style.form}>
            <label htmlFor={FIELD_START}>{START}</label>
            <Field id={FIELD_START} name={FIELD_START} type={DATE} required />

            <label htmlFor={FIELD_END}>{END}</label>
            <Field id={FIELD_END} name={FIELD_END} type={DATE} required />

            <label htmlFor={FIELD_AMOUNT}>{AMOUNT}</label>
            <Field id={FIELD_AMOUNT} name={FIELD_AMOUNT} type={TEXT} required />

            <label htmlFor={FIELD_DAY_OF_WEEK}>{DAY_OF_WEEK}</label>
            <Field as={SELECT} id={FIELD_DAY_OF_WEEK} name={FIELD_DAY_OF_WEEK}>
                {day}
            </Field>

            <label htmlFor={FIELD_TIME} data-tip={TIME_TOOLTIP}>{TIME}</label>
            <Field as={SELECT} id={FIELD_TIME} name={FIELD_TIME} data-tip={TIME_TOOLTIP}>
                {time}
            </Field>

            <label htmlFor={FIELD_CURRENCY}>{CURRENCY}</label>
            <Field as={SELECT} id={FIELD_CURRENCY} name={FIELD_CURRENCY}>
                {currency}
            </Field>

            <button type={FIELD_SUBMIT} className={style.button}>{FORM_BTN}</button>
        </Form>
    )
}
