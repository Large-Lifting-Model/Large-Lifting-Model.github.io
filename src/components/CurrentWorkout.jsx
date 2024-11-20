import styles from "./CurrentWorkout.module.css";
import buttonStyles from "../components/Button.module.css";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import AppAPI from "../components/AppAPI";
import Loader from "../components/Loader";
import useLoader from "../hooks/useLoader";

function CurrentWorkout({ setWorkoutState, workout, setWorkout }) {
	const { error, isLoading, withLoader } = useLoader();
	const [completionStatus, setCompletionStatus] = useLocalStorageState(
		new Array(AppAPI.parseSuggestedWorkout(workout).length).fill(false),
		"completionStatus"
	);
	const [refinement, setRefinement] = useState("");

	const [suggestedWorkout, setSuggestedWorkout] = useState(
		AppAPI.parseSuggestedWorkout(workout)
	);

	useEffect(() => {
		setCompletionStatus((prevStatus) => {
			return prevStatus.length === suggestedWorkout.length
				? prevStatus
				: new Array(suggestedWorkout.length).fill(false);
		});
	}, [setCompletionStatus, suggestedWorkout]);

	const toggleCompletion = (index) => {
		const updatedStatus = [...completionStatus];
		updatedStatus[index] = !updatedStatus[index];
		setCompletionStatus(updatedStatus);
	};

	const handleFinished = () => {
		setWorkoutState(2);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await withLoader(async () => {
			const refinedWorkout = await AppAPI.refineWorkout(workout, refinement);
			reactToUpdatedWorkout(refinedWorkout);
		});
	};

	const reactToUpdatedWorkout = (updatedWorkout) => {
		const updatedSuggestedWorkout =
			AppAPI.parseSuggestedWorkout(updatedWorkout);
		setWorkout(updatedWorkout);
		setSuggestedWorkout(updatedSuggestedWorkout);
		setCompletionStatus((prevStatus) => {
			return prevStatus.length === updatedSuggestedWorkout.length
				? prevStatus
				: new Array(updatedSuggestedWorkout.length).fill(false);
		});
		setRefinement("");
	};

	return (
		<Loader error={error} isLoading={isLoading}>
			<main className={styles.workout}>
				<section className={styles.workoutContainer}>
					<div className={styles.exerciseList}>
						<h2 className={styles.title}>Exercises</h2>
						{suggestedWorkout && suggestedWorkout.length > 0 ? (
							suggestedWorkout.map((item, index) => (
								<div
									key={index}
									className={`${styles.exerciseCard} ${
										completionStatus[index]
											? styles.completedExercise
											: ""
									}`}>
									<div className={styles.exerciseHeader}>
										<span className={styles.exerciseNumber}>
											{item.exercise.name}
										</span>
										<span className={styles.exerciseType}>
											{item.exercise.type}
										</span>
									</div>
									<div>
										<a
											href={`https://www.google.com/search?tbm=isch&q=${item.exercise.name.replace(
												" ",
												"+"
											)}+exercise+gif&tbs=itp:animated`}
											target="_blank"
											rel="noopener noreferrer">
											Google
										</a>
										<a
											href={`https://www.tenor.com/search/${item.exercise.name
												.replace(" ", "-")
												.replace(/[^-a-zA-Z0-9]/g, "-")}-workout`}
											target="_blank"
											rel="noopener noreferrer">
											TenorGIF
										</a>
									</div>
									<div className={styles.exerciseInfo}>
										{item.exercise.info}
									</div>
								</div>
							))
						) : (
							<p>Loading workout...</p>
						)}
					</div>
					<div className={styles.completedColumn}>
						<h3 className={styles.title}>Completed?</h3>
						{suggestedWorkout.map((_, index) => (
							<div
								key={index}
								className={`${styles.checkboxContainer} ${
									completionStatus[index]
										? styles.completedCheckbox
										: ""
								}`}>
								<input
									type="checkbox"
									checked={completionStatus[index]}
									onChange={() => toggleCompletion(index)}
								/>
							</div>
						))}
					</div>
				</section>
				<section>
					<div className={styles.container}>
						<form
							className={styles.form}
							method="post"
							onSubmit={handleSubmit}>
							<label>Suggest Changes...</label>
							<p style={{ opacity: 0.7, fontSize: "1.25rem" }}>
								Make minor adjustments with short, specific statements
								like &apos;swap crunches for bicycle kicks&apos;,
								&apos;remove only squats&apos;, or &apos;give me only 5
								exercises&apos;. <br />
								<br />
								<i>
									Unspecific requests will result in very different
									workouts.
								</i>
							</p>
							<div className={styles.inlineInput}>
								<input
									name="refinementText"
									onChange={(e) => setRefinement(e.target.value)}
									value={refinement}
								/>
								<button
									id="refineWorkout"
									type="submit"
									className={buttonStyles.inline}
									disabled={!refinement}>
									Submit
								</button>
							</div>
						</form>
						<button
							type="button"
							className={`${buttonStyles.primary} ${styles.completeButton}`}
							style={{ width: "100%" }}
							onClick={() => handleFinished()}>
							Complete Workout
						</button>
					</div>
				</section>
			</main>
		</Loader>
	);
}

export default CurrentWorkout;
