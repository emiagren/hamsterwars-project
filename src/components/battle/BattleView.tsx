import { useState, useEffect } from 'react';
// import HamsterCard from './../gallery/HamsterCard';
import { HamsterObject } from '../../types/HamsterInterface';
import './BattleView.css'

const BattleView = () => {

	const [hamster1, setHamster1] = useState<HamsterObject | null>(null);
	const [hamster2, setHamster2] = useState<HamsterObject | null>(null);
	const [winnerHamster1, setWinnerHamster1] = useState(false);
	const [winnerHamster2, setWinnerHamster2] = useState(false);
	const [voted, setVoted] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [newBattle, setNewBattle] = useState(false);

		useEffect(() => {

			async function getRandomHamster() {
				
				try {
					const response1 = await fetch('/hamsters/random', {method: 'GET'});
					const response2 = await fetch('/hamsters/random', {method: 'GET'});

					if(response1.status && response2.status === 200) {
						const data1 = await response1.json();
						const data2 = await response2.json();

						if(data1.id === data2.id) {
							getRandomHamster();
						}
						setHamster1(data1);
						setHamster2(data2)
						setWinnerHamster1(false);
						setWinnerHamster2(false);
						setVoted(false);
						setShowResult(false);
						setNewBattle(false);
					}
				} catch(error) {
					console.log(error);
				}
			}

			getRandomHamster();
			
		}, [newBattle])


		const randomHamster1 = () => {

			if(!hamster1 || !hamster2) {
				return;
			}

			setWinnerHamster1(true);
			setVoted(true);
			setShowResult(true);

			const winner = {
				...hamster1,
				wins: hamster1.wins + 1,
				games: hamster1.games + 1
			}

			const loser = {
				...hamster2,
				defeats: hamster2.defeats + 1,
				games: hamster2.games + 1
			}

			setHamster1(winner);
			setHamster2(loser);
			updateWinner(hamster1);
			updateLoser(hamster2);
			postMatch(winner.dbId, loser.dbId);
			console.log("Winner: " + winner.name, "Loser: " + loser.name);
		}

		const randomHamster2 = () => {

			if(!hamster2 || !hamster1) {
				return;
			}

			setWinnerHamster2(true);
			setVoted(true);
			setShowResult(true);

			const winner = {
				...hamster2,
				wins: hamster2.wins + 1,
				games: hamster2.games + 1
			}

			const loser = {
				...hamster1,
				defeats: hamster1.defeats + 1,
				games: hamster1.games + 1
			}
			
			setHamster2(winner);
			setHamster1(loser);
			updateWinner(hamster2);
			updateLoser(hamster1);
			postMatch(winner.dbId, loser.dbId);
			console.log("Winner: " + winner.name, "Loser: " + loser.name);
		}

		async function updateWinner(winner: HamsterObject) {
			const update = {
				wins: winner.wins + 1,
				games: winner.games + 1
			}

			await fetch('/hamsters/' + winner.dbId, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(update)});
		}

		async function updateLoser(loser: HamsterObject) {
			const update = {
				defeats: loser.defeats + 1,
				games: loser.games + 1
			}

			await fetch('/hamsters/' + loser.dbId, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(update)});
		}

		async function postMatch(winnerId: string, loserId:string) {
			

			const match = {
				winnerId: winnerId,
				loserId: loserId
			}

			await fetch('/matches', {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(match)});
		}


		function newHamsterBattle() {
			setNewBattle(true);
		}


		return (
			<div className="battle-view">

				<h1>Hamster Battle</h1>

				<div className="battle-container">

					{hamster1 ?
					<div className="hamster-card" key={hamster1.dbId} onClick={randomHamster1}>
					<img src={`img/${hamster1.imgName}`} alt="Super cute hamster" />
					<h3> {hamster1?.name} </h3>
					{showResult? (
					<div>
						{winnerHamster1 ? 
						<h3 className="winner"> WINNER </h3> : 
						<h3 className="loser"> LOSER </h3>}
						</div> ) : ("")}
					{!voted ? 
					<button>Vote</button> : null }
					</div> : <p> Loading hamster... </p> }

					{hamster2 ?
					<div className="hamster-card" key={hamster2.dbId} onClick={randomHamster2}>
					<img src={`img/${hamster2.imgName}`} alt="Super cute hamster" />
					<h3> {hamster2?.name} </h3>
					{showResult? ( 
					<div>
						{winnerHamster2 ? 
						<h3 className="winner"> WINNER </h3> : 
						<h3 className="loser"> LOSER </h3>} 
						</div> ) : ("")}	
					{!voted ? 
					<button>Vote</button> : null }
					</div> : <p> Loading hamster... </p> }
				</div>
				
				{!voted ?
				<p>The cuteness is strong with these ones.
					It's time to choose your favorite. <br/> 
					<br />
					If looks just ain't enough for you and you want to know more <br/> 
					about the hamsters before you vote, go to the gallery to learn more about them. <br/>
					<br/>
					May the cutest hamster win!</p> : null}
				{showResult ?
				<button onClick={newHamsterBattle}>New battle</button> : null }	
			</div>
		)
	}	

export default BattleView;