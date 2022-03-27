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


const formState: TForm = { start: '', end: '', dayOfWeek: '', currency: '', amount: '', time: '' };

export default function FormReducer(state = formState, action: TAction) {
	switch (action.type) {
		case SET_PARAMS:

		return {...state, ...action.payload}

		default:
			return state;
	}
}


