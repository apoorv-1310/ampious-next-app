"use client";
import * as React from "react";
import AdminLayouts from "./shared/AdminLayouts";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useAppSelector } from "@/store/store";

export const ErrorComponent = () => {
	return <h1>Error</h1>;
};

const AdminDashboard=() => {
	const admin=useAppSelector(state => state)
	console.log('adm',admin)
	return (
		<ErrorBoundary errorComponent={ErrorComponent}>
			<AdminLayouts />
		</ErrorBoundary>
	);
};

export default AdminDashboard;
