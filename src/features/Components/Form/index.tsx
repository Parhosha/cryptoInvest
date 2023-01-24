import React from 'react'
import Fields from './components/Fields'
import { getCurrency, getDayOfWeek, getTime } from '../../../constants/params';
import FormContainer from './components/FormContainer'

type TForm = {
    notify: () => void
}

export default function Form({ notify }: TForm) {
    const day = getDayOfWeek();
    const time = getTime();
    const currency = getCurrency();

    return (
        <FormContainer notify={notify}>
            <Fields day={day} time={time} currency={currency} />
        </FormContainer>
    )
}
