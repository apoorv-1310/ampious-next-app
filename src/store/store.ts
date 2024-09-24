import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import adminSlice from "./slices/adminSlice";
import tokenSlice from "./slices/tokenSlice";
import loaderSlice from "./slices/loaderSlice";

const rootReducer = combineSlices(adminSlice, tokenSlice,loaderSlice);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
