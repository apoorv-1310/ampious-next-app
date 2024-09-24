import { IAdminResponse } from "@/interfaces";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAdminResponse = {
	id: "",
	_id: "",
	fname: "",
	lname: "",
	phoneNo: "",
	email: "",
	password: "",
	avatar: "",
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IAdminResponse>) => {
			console.log(action);
			// state._id = nanoid();
			state = action.payload;
			console.log("state",state);
			return state
		},
	},
});

export const { login } = adminSlice.actions;

export default adminSlice;
