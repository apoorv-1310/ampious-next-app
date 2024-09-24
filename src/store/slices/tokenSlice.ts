import { IAdminResponse } from "@/interfaces";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: { token: string } = {
	token: "",
};

const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {
		addToken: (state, action: PayloadAction<string>) => {
			console.log(action);
			state.token = action.payload;
			return state;
		},
	},
});

export const { addToken } = tokenSlice.actions;

export default tokenSlice;
