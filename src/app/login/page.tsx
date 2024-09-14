"use client"; // This is a client component 👈🏽

import * as React from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { API_HOSTNAME } from "../../shared/constants";
import { Button, Container, FormControl, TextField, Typography } from "@mui/material";

const AdminLogin = () => {
	const service = axios;
	const title = "Login";
	const router = useRouter();

	const [form, setForm] = React.useState({
		email: "",
		password: "",
	});

	React.useEffect(() => {
		document.title = `Ampious : ${title}`;
		document.addEventListener("keyup", (event) => {
			if (event.key === "Enter") {
				loginHandle();
			}
		});
	}, []);

	const loginHandle = async () => {
		if (!form.email || !form.password) {
			// Swal.fire("Login Error", "Please Enter correct Email and password", "error");
		}
		service;
		service
			.post(`${API_HOSTNAME}/admin/login`, {
				email: form.email,
				password: form.password,
			})
			.then((response: AxiosResponse) => {
				localStorage.setItem("user", JSON.stringify(response.data.admin));
				localStorage.setItem("user-type", "admin");
				localStorage.setItem("token",response.headers["authorization"]);
				router.push('/dashboard')
			})
			.catch((error) => {
				// Swal.fire("Login Error", "Please Enter correct Email and password", "error");
			});
	};

	const setFormValues = (field: string, value: string) => {
		setForm({
			...form,
			[field]: value,
		});
	};

	return (
		<>
			<div className="h-[90vh]">
				<Container
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
					<div className="col-md-5">
						<div className="card">
							<div className="card-header text-center">
								<img alt="ampious-logo" width={"25%"} style={{ alignSelf: "center" }} />
							</div>
							<div className="card-header text-center">
								<Typography variant="h4"> Welcome Admin</Typography>
								<Typography variant="h4"> Please Login</Typography>
							</div>
							<div className="card-body">
								<FormControl fullWidth>
									<TextField
										label="Email"
										type="text"
										value={form.email}
										placeholder="Enter Your Email"
										className="form-control"
										onChange={(event) => {
											setFormValues("email", event.target.value);
										}}
									/>
								</FormControl>
								<FormControl fullWidth>
									<TextField
										label="Password"
										type="password"
										value={form.password}
										placeholder="Enter Your Password"
										className="form-control my-3"
										onChange={(event) => {
											setFormValues("password", event.target.value);
										}}
									/>
								</FormControl>
								<div style={{ display: "flex", justifyContent: "space-between" }}>
									<Button
										fullWidth
										variant="contained"
										onClick={() => {
											loginHandle();
										}}
										sx={{ width: "8rem" }}
									>
										Login
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};

export default AdminLogin;
