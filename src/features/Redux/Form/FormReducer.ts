import { SET_DEFAULT_FORM } from "../../../constants/values";
import { TAction } from "../../../types";
import { SET_PARAMS } from "./FormActions";

export type TForm = {
	start: string,
    end: string,
    dayOfWeek: string,
    currency: string,
    amount: string,
	time: string,
}

const initFormState: TForm  = { start: '', end: '', dayOfWeek: '', currency: '', amount: '', time: '' };
const formState = {...initFormState};

export default function FormReducer(state = formState, action: TAction) {
	switch (action.type) {
		case SET_PARAMS:
			return {...state, ...action.payload}

		case SET_DEFAULT_FORM:
			return initFormState

		default:
			return state;
	}
}


