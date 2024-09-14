"use client";
import * as React from "react";
import AdminLayouts from "./shared/AdminLayouts";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export const ErrorComponent=() => {
    return (
        <h1>Error</h1>
    )
}

const AdminDashboard = () => {
	return (
		<ErrorBoundary errorComponent={ErrorComponent}>
			<AdminLayouts />
		</ErrorBoundary>
	);
};

export default AdminDashboard;
