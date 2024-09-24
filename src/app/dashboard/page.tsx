"use client";
import * as React from "react";
import AdminLayouts from "./shared/AdminLayouts";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { usePathname } from "next/navigation";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { IGymOwner, IGymOwnerResponse } from "../../interfaces";
import axios from "axios";
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
// React Data Grid Component
import { AgGridReact } from "ag-grid-react";
import { showLoader } from "@/store/slices/loaderSlice";

export const ErrorComponent = () => {
	return <h1>Error</h1>;
};

const AdminDashboard = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const dispatch = useAppDispatch();
	const pathname = usePathname();
	const [gymOwners, setGymOwners] = React.useState<IGymOwnerResponse[]>([]);

	const [showAddModal, setShouldShowAddModal] = React.useState<boolean>(false);
	const [form, setForm] = React.useState<IGymOwner>({
		fname: "",
		lname: "",
		phoneNo: "",
		email: "",
		password: "",
	});

	React.useEffect(() => {
		GOs();
	}, []);

	const handleClose = () => {
		setShouldShowAddModal(false);
	};

	const GOs = () => {
		dispatch(showLoader(true));
		axios.get("/api/admin").then((response) => {
			setGymOwners(response.data);
			dispatch(showLoader(false));
		});
	};

	const deleteGo = (id: string) => {
		axios
			.delete("/api/admin", {
				data: {
					_id: id,
				},
			})
			.then((response) => {
				GOs();
			});
	};

	const updateForm = (field: string, value: string) => {
		setForm({
			...form,
			[field]: value,
		});
	};

	const saveGO = () => {
		axios.post("/api/admin", form).then((response) => {
			GOs();
		});
	};
	const [colDefs, setColDefs] = React.useState<any>([
		{ field: "_id" },
		{ field: "fname" },
		{ field: "lname" },
		{ field: "phoneNo" },
		{ field: "email" },
		{ field: "createdOn" },
		{
			field: "Action",
			cellRenderer: (params: any) => {
				return (
					<Button
						onClick={() => {
							deleteGo(params.data._id);
						}}
					>
						Delete
					</Button>
				);
			},
		},
	]);

	return (
		<ErrorBoundary errorComponent={ErrorComponent}>
			<AdminLayouts />
			<Container>
				<Button
					fullWidth
					variant="contained"
					onClick={() => {
						setShouldShowAddModal(true);
					}}
				>
					Add Gym Owner
				</Button>

				<div className="ag-theme-quartz" style={{ height: 500, paddingTop: 10 }}>
					<AgGridReact rowData={gymOwners} columnDefs={colDefs} />
				</div>

				<Dialog
					open={showAddModal}
					onClose={handleClose}
					PaperProps={{
						component: "form",
						onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
							event.preventDefault();
							const formData = new FormData(event.currentTarget);
							const formJson = Object.fromEntries((formData as any).entries());
							const email = formJson.email;
							console.log(email);
							handleClose();
						},
					}}
				>
					<DialogTitle>Add New gym Owner</DialogTitle>
					<DialogContent>
						<Grid container direction="column">
							<Grid item>
								<TextField
									autoFocus
									required
									margin="dense"
									id="fname"
									name="First Name"
									label="First Name"
									type="text"
									fullWidth
									variant="standard"
									onChange={(e) => {
										updateForm("fname", e.target.value);
									}}
								/>
							</Grid>
							<Grid item>
								<TextField
									autoFocus
									required
									margin="dense"
									id="lname"
									name="Last Name"
									label="Last Name"
									type="text"
									fullWidth
									variant="standard"
									onChange={(e) => {
										updateForm("lname", e.target.value);
									}}
								/>
							</Grid>
							<Grid item>
								<TextField
									autoFocus
									required
									margin="dense"
									id="email"
									name="Email"
									label="Email"
									type="text"
									fullWidth
									variant="standard"
									onChange={(e) => {
										updateForm("email", e.target.value);
									}}
								/>
							</Grid>
							<Grid item>
								<TextField
									autoFocus
									required
									margin="dense"
									id="password"
									name="password"
									label="Password"
									type="password"
									fullWidth
									variant="standard"
									onChange={(e) => {
										updateForm("password", e.target.value);
									}}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit" onClick={saveGO}>
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</ErrorBoundary>
	);
};

export default AdminDashboard;
