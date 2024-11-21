import AppNav from "../components/AppNav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/home");
		}, 1500);

		return () => {
			clearTimeout();
		};
	});
	return (
		<>
			<AppNav />
			<div>
				<h2>
					{
						"🥇 Congratulations on completing your workout! Please wait while you are redirected."
					}
				</h2>
			</div>
		</>
	);
}

export default Success;
