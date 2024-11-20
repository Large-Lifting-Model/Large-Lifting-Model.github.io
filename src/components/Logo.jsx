import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import logoImage from "../assets/logo.png";

function Logo({ link }) {
	return (
		<div className={styles.logo}>
			<Link to={link}>
				<img src={logoImage} alt="LLM Logo" className={styles.img} />
			</Link>
			<h3>Large Lifting Model</h3>
		</div>
	);
}

export default Logo;
