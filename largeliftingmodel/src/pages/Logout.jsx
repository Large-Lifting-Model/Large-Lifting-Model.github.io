import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";

function Logout() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			localStorage.clear();
			navigate("/");
			window.location.reload();
		}, 3000);

		return () => {
			clearTimeout();
		};
	});

	return (
		<>
			<PageNav />
			<div>
				<h2>
					{
						"You've successfully logged out. Please wait while you are redirected."
					}
				</h2>
			</div>
		</>
	);
}

export default Logout;
