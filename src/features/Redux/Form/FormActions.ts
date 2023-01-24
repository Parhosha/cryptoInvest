import { SET_DEFAULT_FORM } from "../../../constants/values";
import { TForm } from "./FormReducer";

export const SET_PARAMS = 'SET_PARAMS'

const actions = {
	setParameters: (values: TForm) => {
		return { type: SET_PARAMS, payload: {...values } };
	},
	setDefault: () => {
		return {type: SET_DEFAULT_FORM, payload: {}}
	}

};
export default actions