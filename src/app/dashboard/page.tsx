"use client";
import * as React from "react";
import AdminLayouts from "./shared/AdminLayouts";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useAppSelector } from "@/store/store";
import { usePathname } from "next/navigation";
import Gyms from "./gyms/page";
import { Box, Container, Pagination, Stack } from "@mui/material";
import { DataGrid, GridColDef, gridPageCountSelector, gridPageSelector, gridPaginationSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import { IAdminResponse, IGymOwnerResponse } from "../../interfaces";
import axios from "axios";

export const ErrorComponent = () => {
	return <h1>Error</h1>;
};

const columns: GridColDef<IGymOwnerResponse>[] = [
	{ field: "_id", headerName: "ID", width: 200 },
	{
		field: "fname",
		headerName: "First name",
		width: 200,
		editable: true,
	},
	{
		field: "lname",
		headerName: "Last name",
		width: 200,
		editable: true,
	},
	{
		field: "phoneNo",
		headerName: "Phone No",
		type: "number",
		width: 110,
		editable: true,
	},
	{
		field: "email",
		headerName: "Email",
		type: "string",
		width: 110,
		editable: true,
	},
	{
		field: "createdOn",
		headerName: "Created Date",
		type: "string",
		width: 110,
		editable: true,
	},
];

const AdminDashboard = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const pathname = usePathname();
	const [gymOwners, setGymOwners] = React.useState<IGymOwnerResponse[]>([]);
	React.useEffect(() => {
		axios.get("/api/admin").then((response) => {
			setGymOwners(response.data);
		});
	}, []);

	const admin = useAppSelector((state) => state);
	return (
		<ErrorBoundary errorComponent={ErrorComponent}>
			<AdminLayouts />
			<Container>
				<DataGrid
					rows={gymOwners}
					columns={columns}
					getRowId={(row) => {
						return row._id;
					}}
					pagination={true}
					slotProps={{
						pagination: { labelDisplayedRows: ({ from, to, count }) => `${from.toLocaleString("en")}-${to.toLocaleString("en")}` },
						loadingOverlay: {
							variant: "linear-progress",
							noRowsVariant: "skeleton",
						},
					}}
				/>
				<Pagination count={10} color="primary" />
			</Container>
		</ErrorBoundary>
	);
};

export default AdminDashboard;
