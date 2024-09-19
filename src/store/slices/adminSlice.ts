import { IAdminResponse } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAdminResponse = {
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
		login: (state, action: PayloadAction<IAdminResponse>) => (state = action.payload)
	},
});

export const { login } = adminSlice.actions;

export default adminSlice.reducer;

