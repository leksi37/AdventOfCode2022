import React, { useState } from "react";
import "./App.css";

function App() {
	const [error, setError] = useState("");
	const [calloriesInput, setCalloriesInput] = useState("");
	const [highestCalloriesCount, setCalloriesCount] = useState("");

	const handleCalloriesInputChange = (event: any) => {
		setCalloriesInput(event.target.value);
	};

	const checkCallories = () => {
		if (/[0-9 ]+/.test(calloriesInput)) {
			setError("");
			const elfCallorieGroups = calloriesInput.split("  ");
			let highestCalloriesAmout = 0;
			let elfNumber = 0;
			for (let i = 0; i < elfCallorieGroups.length; i++) {
				const callories = elfCallorieGroups[i].split(" ");
				let calloriesCount = 0;
				callories.forEach((c) => (calloriesCount += Number.parseInt(c)));
				if (calloriesCount > highestCalloriesAmout) {
					highestCalloriesAmout = calloriesCount;
					elfNumber = i + 1;
				}
			}
			setCalloriesCount(
				`And the most calories aree... ${highestCalloriesAmout} callories for elf No${elfNumber}. Phew that's a lot
				of callories.`
			);
		} else {
			setError(
				"It seems you have been naughty this year.. Please provide only numbers and spaces input in the callories field.."
			);
			setCalloriesInput("");
		}
	};

	return (
		<div className="App">
			<div>
				<p>Check which elf carries the most callories:</p>
			</div>
			<input
				type="text"
				id="message"
				name="message"
				onChange={handleCalloriesInputChange}
				value={calloriesInput}
			/>
			<button onClick={checkCallories}>Check callories</button>
			<div>{highestCalloriesCount}</div>

			<br />
			<div>{error}</div>
		</div>
	);
}

export default App;
