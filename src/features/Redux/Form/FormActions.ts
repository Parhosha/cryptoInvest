import { TForm } from "./FormReducer";

export const SET_PARAMS = 'SET_PARAMS'

const actions = {
	setParameters: (values: TForm) => {
		return { type: SET_PARAMS, payload: {...values } };
	},

};
export default actions