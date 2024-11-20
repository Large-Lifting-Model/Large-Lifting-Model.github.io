//import { useEffect } from "react";
import styles from "./Form.module.css";
import { useEffect } from "react";

const HealthInfo_Viewer = (props) => {
	useEffect(() => {}, []);

	return (
		<div className={styles.view}>
			<div className={styles.form_description}>
				Health Information
				<hr />
			</div>
			<div className={styles.container}>
				<div className={styles.container_inline}>
					<label> Date of Birth </label>
					<h2 className={styles.h2}> {props.health_data.dob} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Gender </label>
					<h2 className={styles.h2}> {props.health_data.gender} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Height (m) </label>
					<h2 className={styles.h2}> {props.health_data.height} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Weight (kg) </label>
					<h2 className={styles.h2}> {props.health_data.weight} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Favorite Workout Type </label>
					<h2 className={styles.h2}>
						{" "}
						{props.health_data.favourite_workout_type}{" "}
					</h2>
				</div>
				<div className={styles.container_inline}>
					<label> Workout Experience </label>
					<h2 className={styles.h2}>
						{" "}
						{props.health_data.workout_experience}{" "}
					</h2>
				</div>
				<div className={styles.container_inline}>
					<label> Fitness Goal </label>
					<h2 className={styles.h2}> {props.health_data.fitness_goal} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Injuries </label>
					<h2 className={styles.h2}> {props.health_data.injuries} </h2>
				</div>
				<div className={styles.container_inline}>
					<label> Other Considerations </label>
					<h2 className={styles.h2}>
						{" "}
						{props.health_data.other_considerations}{" "}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default HealthInfo_Viewer;
