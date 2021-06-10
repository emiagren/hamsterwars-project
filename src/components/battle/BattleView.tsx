import { useState, useEffect } from 'react';
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
			
			const response1 = await fetch('/hamsters/random', {method: 'GET'});
			const response2 = await fetch('/hamsters/random', {method: 'GET'});
			const data1 = await response1.json();
			const data2 = await response2.json();

			if(data1.id === data2.id) {
				getRandomHamster();
			}
			setHamster1(data1);
			setHamster2(data2)
			setNewBattle(false);
		}

		getRandomHamster();
		
	}, [newBattle])
	

	function newHamsterBattle() {
		setNewBattle(true);
		setWinnerHamster1(false);
		setWinnerHamster2(false);
		setVoted(false);
		setShowResult(false);
	}

	const voteHamster1 = () => {

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
		postMatch(winner.id, loser.id);
	}

	const voteHamster2 = () => {

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
		postMatch(winner.id, loser.id);
	}

	async function updateWinner(winner: HamsterObject) {
		const update = {
			wins: winner.wins + 1,
			games: winner.games + 1
		}
		await fetch('/hamsters/' + winner.id, {method: 'PUT', headers: {
		'Content-type': 'application/json'}, body: JSON.stringify(update)});
	}

	async function updateLoser(loser: HamsterObject) {
		const update = {
			defeats: loser.defeats + 1,
			games: loser.games + 1
		}
		await fetch('/hamsters/' + loser.id, {method: 'PUT', headers: {
		'Content-type': 'application/json'}, body: JSON.stringify(update)});
	}

	async function postMatch(winnerId: string, loserId:string) {
		const match = {
			winnerId: winnerId,
			loserId: loserId
		}
		console.log(match.winnerId, match.loserId);
		await fetch('/matches', {method: 'POST', headers: {
		'Content-type': 'application/json'}, body: JSON.stringify(match)});
	}


	return (
		<div className="battle-view">

			<h1>Hamster Battle</h1>
			<p> Click on a hamster to give it your vote. </p>
			<div className="battle-container">

				{hamster1 ?
				<div className="card-wrap">
					<div className="hamster-card" key={hamster1.id} onClick={voteHamster1}>
						<img src={`img/${hamster1.imgName}`} alt="Super cute hamster" />
						<h3> {hamster1?.name} </h3>
					</div>
					{showResult? (
						<div>
							{winnerHamster1 ? 
							<h2 className="winner"> WINNER </h2> : 
							<h2 className="loser"> LOSER </h2>}
						</div> ) : ("")}
				</div> : <p> Loading hamster... </p> }

				{hamster2 ?
				<div className="card-wrap">
					<div className="hamster-card" key={hamster2.id} onClick={voteHamster2}>
						<img src={`img/${hamster2.imgName}`} alt="Super cute hamster" />
						<h3> {hamster2?.name} </h3>
					</div>
					{showResult? ( 
						<div>
							{winnerHamster2 ? 
							<h2 className="winner"> WINNER </h2> : 
							<h2 className="loser"> LOSER </h2>} 
							</div> ) : ("")}	
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

// function voteHamster(winner: HamsterObject, loser: HamsterObject) {
// 	if(winner && loser) {

// 		const updateWinner = {
// 			wins: winner.wins +1,
// 			games: winner.games +1
// 		}

// 		const updateLoser = {
// 			defeats: loser.defeats +1,
// 			games: loser.games +1
// 		}

// 		if(hamster1 && hamster2) {
// 			let matchWinner: HamsterObject
// 			let matchLoser: HamsterObject

// 			if(hamster1.dbId === winner.dbId) {
// 				matchWinner = hamster1;
// 				matchLoser = hamster2
// 			} else {
// 				matchWinner = hamster2;
// 				matchLoser = hamster1;
// 			}

// 			matchWinner.wins = winner.wins +1;
// 			matchWinner.games = winner.games +1;
// 			matchLoser.defeats = loser.defeats +1;
// 			matchLoser.games = loser.games +1;

// 			setHamsterWinner(matchWinner);
// 			setHamsterLoser(matchLoser);

// 			Promise.all ([
// 				putHamster(winner.dbId, updateWinner),
// 				putHamster(loser.dbId, updateLoser),
// 				postMatch(winner.dbId, loser.dbId)
// 			]).then(() => {
// 				setVoted(true);
// 			})
// 		}
// 	}
// }

// async function putHamster(dbId: string, update: any) {
// 	await fetch('/hamsters/' + dbId, {method: 'PUT', headers: {
// 	'Content-type': 'application/json'}, body: JSON.stringify(update)});
// }

export default BattleView;