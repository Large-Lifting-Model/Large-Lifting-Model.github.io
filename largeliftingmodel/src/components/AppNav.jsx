import { NavLink, useNavigate } from "react-router-dom";
import styles from "./AppNav.module.css";
import Logo from "./Logo";
import { useEffect } from "react";
// import AppAPI from "./AppAPI";

function AppNav() {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/logout");
	};

	useEffect(() => {
		if (!localStorage.getItem("tokens")) {
			navigate("/login");
		}
	});
	return (
		<nav className={styles.nav}>
			<Logo link="/home" />
			<ul>
				<li>
					<NavLink to="/home">Home</NavLink>
				</li>
				<li>
					<NavLink to="/workout">Workout</NavLink>
				</li>
				<li>
					<NavLink to="/history">History</NavLink>
				</li>
				<li>
					<NavLink to="/profile">Profile</NavLink>
				</li>
				<li>
					<a
						href="/"
						onClick={() => {
							handleLogout();
						}}>
						Logout
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
