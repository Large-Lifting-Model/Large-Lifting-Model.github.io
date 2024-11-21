import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.clear();
		setTimeout(() => {
			navigate("/");
		}, 3000);

		return () => {
			clearTimeout();
		};
	});

	return <div>{"You've successfully logged out."}</div>;
}

export default Logout;
