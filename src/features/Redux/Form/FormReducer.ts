/* eslint-disable @typescript-eslint/ban-types */

interface IForm {
	start: string;
    end: string;
    period: string;
    currency: string;
    amount: string;
}


const formState: IForm = { start: '', end: '', period: '', currency: '', amount: '' };

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
