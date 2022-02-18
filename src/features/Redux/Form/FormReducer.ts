/* eslint-disable @typescript-eslint/ban-types */

export interface IForm {
	start: string;
    end: string;
    dayOfWeek: string;
    currency: string;
    amount: string;
	time: string;
}


const formState: IForm = { start: '', end: '', dayOfWeek: '', currency: '', amount: '', time: '' };

export default function FormReducer(state = formState, action: any) {
	switch (action.type) {
		case 'SET_PARAMS':

		return {...state, ...action.payload}

		default:
			return state;
	}
}

export const action = {
	setParameters: (values: IForm) => {
		return { type: 'SET_PARAMS', payload: {...values } };
	},

};
