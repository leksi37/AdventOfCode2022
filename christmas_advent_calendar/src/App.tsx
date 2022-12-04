import React, { useState } from "react";
import { isConstructorDeclaration } from "typescript";
import "./App.css";

function App() {
	const [error, setError] = useState("");
	const [calloriesInput, setCalloriesInput] = useState("");
	const [highestCalloriesCount, setCalloriesCount] = useState("");

	const [racksackInput, setRacksackInput] = useState("");
	const [racksackRearengementResult, setRacksackRearengementResult] = useState("");

	const handleCalloriesInputChange = (event: any) => {
		setCalloriesInput(event.target.value);
	};

	const handleRacksackInputChange = (event: any) => {
		setRacksackInput(event.target.value);
	};

	const validateInput = (methodNum: number) => {
		if (/[0-9 ]+/.test(calloriesInput)) {
			setError("");
			if(methodNum === 1){
				checkCallories();
			}else{
				checkCalloriesTopThreeElfs();
			}
		}else {
			setError(
				"It seems you have been naughty this year.. Please provide only numbers and spaces input in the callories field.."
			);
			setCalloriesInput("");
		}
	}

	const checkCallories = () => {
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
	};
	 

	const checkCalloriesTopThreeElfs = () => {
		const elfCallorieGroups = calloriesInput.split("  ");
		const calloriesSums:  Array<number> = []

		for (let i = 0; i < elfCallorieGroups.length; i++) {
			const callories = elfCallorieGroups[i].split(" ");
			let calloriesCount = 0;
			callories.forEach((c) => (calloriesCount += Number.parseInt(c)));
			calloriesSums.push(calloriesCount);
		}
		calloriesSums.sort((a, b) => a - b);
		const topThreeElfsCallories = calloriesSums[calloriesSums.length-1] + calloriesSums[calloriesSums.length-2] + calloriesSums[calloriesSums.length-3];
		
		setCalloriesCount(
			`And the 3 heaviest elfs carry a total of... ${topThreeElfsCallories} callories. Phew that's a lot
			of callories.`
		);
	};


	const handleRacksackInput = () => {
		const inputArr = racksackInput.split(' ');
		console.log(racksackInput);
		console.log(inputArr);
		let finalRearangedNumber = 0;
		inputArr.forEach(racksackInputValue => {
			finalRearangedNumber+=rearangeItems(racksackInputValue);
		});
		console.log(finalRearangedNumber);
	}

	const rearangeItems = (word: string): number => {
		const breakingPoint = word.length/2;
		console.log(breakingPoint);

		const firstHalf = word.slice(0, breakingPoint);
		const secondHalf = word.slice(breakingPoint);
		console.log(firstHalf);
		console.log(secondHalf);
		const similarLettersArray = checkForSimilarLetters(firstHalf, secondHalf);
		console.log(similarLettersArray);
		let similarLettersCount = 0;
		similarLettersArray.forEach(letter => {
			const arr = alphabetPosition(letter);
			arr.forEach(num => similarLettersCount+=num)
		});
		return similarLettersCount;
	}

	const checkForSimilarLetters = (wordOne:string, wordTwo:string) => {
		const similarLettersArray: string[] = [];
		console.log('word one length is ' + wordOne.length);
		for(let i = 0; i < wordOne.length; i++){
			if(wordTwo.includes(wordOne.charAt(i)) && !similarLettersArray.find((letter) => letter === wordOne.charAt(i)))
				similarLettersArray.push(wordOne.charAt(i));
		}
		return similarLettersArray;
	}

	const alphabetPosition = (text: string) => {
		text.split(' ').join('');
		var chari = "";
		var arr = [];
		var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
		for(var i = 0; i < text.length; i++){
		  chari = text.charAt(i);
		  if(alphabet.indexOf(chari) > -1){
			arr.push(alphabet.indexOf(chari)+1);
		  }
		}
		return arr;
	  }

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
			<button onClick={() => validateInput(1)}>Check most callories per elf</button>
			<button onClick={() => validateInput(2)}>Check callories for top 3 elf</button>
			<div>{highestCalloriesCount}</div>
			<br />
			<div>
				<p>Check :</p>
			</div>
			<input
				type="text"
				id="racksackInput"
				name="racksackInput"
				onChange={handleRacksackInputChange}
				value={racksackInput}
			/>
			<button onClick={() => handleRacksackInput()}>Check most callories per elf</button>
			<div>{racksackRearengementResult}</div>
			<div>{error}</div>
		</div>
	);
}

export default App;
