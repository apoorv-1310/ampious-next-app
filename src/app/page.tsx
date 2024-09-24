"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/store/slices/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToken } from "@/store/slices/tokenSlice";

export default function Home() {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const checkAuth = async () => {
		const user = await localStorage.getItem("user");
		const token = await localStorage.getItem("token");
		console.log("user", user);
		console.log("token", token);

		if (user && token) {
			dispatch(login(JSON.parse(user)));
			dispatch(addToken(token));
			router.push("/dashboard");
		} else {
			router.replace("/login");
		}
	};

	React.useLayoutEffect(() => {
		checkAuth();
	}, []);

	React.useEffect(() => {
		checkAuth();
	},[]);
}
