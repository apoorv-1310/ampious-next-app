import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const initialState: { showLoader: boolean } = {
	showLoader: false,
};

const loaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		showLoader: (state, action: PayloadAction<boolean>) => {
			console.log(action);
			state.showLoader = action.payload;
			return state;
		},
	},
});

export const { showLoader } = loaderSlice.actions;

export default loaderSlice;
