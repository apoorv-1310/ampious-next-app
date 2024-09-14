import "../../../assets/layout.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faUsers, faHomeUser, faRoadCircleXmark, faDumbbell, faPerson, faPersonChalkboard, faRestroom, faDashboard } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import * as logo from "../../../assets/logo.png";
import { Divider } from "@mui/material";

export default function AdminLayouts() {
	const pathname = window.location.pathname;
	const [headerToggle, setHeaderToggle] = useState(false);
	const [sidebar, setSidebar] = useState<boolean>(false);
	const [headerNavManu, setheaderNavManu] = useState(true);

	useEffect(() => {
		if (pathname.includes("public")) {
			setSidebar(false);
		} else {
			setSidebar(true);
		}
	}, [pathname]);

	const headerTogglehandle = () => {
		setHeaderToggle(!headerToggle);
		setheaderNavManu(!headerNavManu);
	};
	var body_pd = document.getElementById("body-pd");

	useEffect(() => {
		window.innerWidth >= 768 && (headerToggle ? body_pd?.classList.add("body-pd") : body_pd?.classList.remove("body-pd"));
		if (document.getElementById("header") !== null) {
			headerToggle && document.getElementById("header")?.classList.add("body-pd");
			headerToggle !== true && document.getElementById("header")?.classList.remove("body-pd");
		}
	}, [headerToggle]);

	const logoutHandle = () => {
		Swal.fire({
			icon: "warning",
			title: "Are you sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then(() => {
			/* Read more about isConfirmed, isDenied below */
			// logoutUserAction();
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("user-type");
			localStorage.removeItem("gym_info");
			localStorage.removeItem("member_ship_details");

			// navigate("/public/login");
			window.location.href = "/public/login";
		});
	};

	return (
		<div className="">
			<div className={!sidebar ? "d-none" : ""}>
				<header className="header mb-4 dropdown" id="header">
					<div onClick={headerTogglehandle} className="header_toggle" id="header-toggle">
						{headerNavManu ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} />}{" "}
					</div>

					{/* 
					{user && (
						<div className="d-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
							<span className="header_img">
								<img src={user?.avatar} alt="Admin" />
							</span>
							<span className="ms-1">
								{user!.fname} {user!.lname}
							</span>
						</div>
					)} */}
					<ul className="dropdown-menu dropdown-menu-end" style={{ width: "auto", padding: "0, 2rem" }} aria-labelledby="dropdownMenuButton1">
						<li className="dropdown-item" onClick={logoutHandle}>
							Log Out
						</li>
						<li>
							<Divider />
						</li>
						<li>
							<Link className="dropdown-item" href="/public/terms-and-conditions" target="_self">
								Terms And Conditions
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" href="/public/refunds-policy" target="_self">
								Refund Policy
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" href="/public/privacy-policy" target="_self">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" href="/public/about-us" target="_self">
								About Us
							</Link>
						</li>

						<li>
							<Link className="dropdown-item" href="/public/contact-us">
								Contact Us
							</Link>
						</li>
					</ul>
				</header>

				<div className="manubar">
					<div className={`l-navbar ${headerToggle ? "show" : " "}`} id="nav-bar">
						<nav className="nav">
							<div>
								{!headerToggle ? (
									<div className=" flex justify-start items-center ml-2 mb-2">
										<div className=" w-14 h-14 overflow-hidden p-2 ">
											<img src={`/logo.png`} alt="" width={50} height={50} />
										</div>
									</div>
								) : (
									<div className="flex justify-center items-center">
										<div className="h-24 w-24 flex justify-center items-center">
											<img src={`/logo.png`} alt="" width={50} height={50} />
										</div>
									</div>
								)}{" "}
								<div className="nav_list">
									<Link href="/dashboard" className={`nav_link ${pathname === "/" || pathname === "/dashboard" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faDashboard} />
										<span className="nav_name">Dashboard</span>
									</Link>
									<Link href="/gym-info" className={`nav_link ${pathname === "/gym-info" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faHomeUser} />
										<span className="nav_name">My Gym</span>
									</Link>
									<Link href="visitor-management" className={`nav_link ${pathname === "/visitor-management" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faRestroom} />
										<span className="nav_name">My Vistors</span>
									</Link>
									<Link href="/gym-customers" className={`nav_link ${pathname === "/gym-customers" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faUsers} />
										<span className="nav_name">Manage Customers</span>
									</Link>
									<Link href="/gym-membership-plan" className={`nav_link ${pathname === "/gym-membership-plan" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faRoadCircleXmark} />
										<span className="nav_name">Membership plans</span>
									</Link>
									<Link href="/workout-manager" className={`nav_link ${pathname === "/workout-manager" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faDumbbell} />
										<span className="nav_name">Workouts manager</span>
									</Link>
									<Link href="/staff" className={`nav_link ${pathname === "/staff" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faPerson} />
										<span className="nav_name">Manage Staff</span>
									</Link>
									<Link href="/add-classes" className={`nav_link ${pathname === "/add-classes" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faPersonChalkboard} />
										<span className="nav_name">Gym Classes</span>
									</Link>
									{/* <Link to="/add-edit-events" className={`nav_link ${pathname === "/add-edit-events" ? "active" : ""}`}>
										<FontAwesomeIcon icon={faTowerBroadcast} />
										<span className="nav_name">Events</span>
									</Link> */}
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}
