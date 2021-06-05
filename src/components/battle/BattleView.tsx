import { useState, useEffect } from 'react';
import HamsterCard from './../gallery/HamsterCard';
import { HamsterObject } from '../../types/HamsterInterface';
import './BattleView.css'

const BattleView = () => {

	const [hamster1, setHamster1] = useState<HamsterObject | null>(null);
	const [hamster2, setHamster2] = useState<HamsterObject | null>(null);
	const [winnerHamster1, setWinnerHamster1] = useState(false);
	const [winnerHamster2, setWinnerHamster2] = useState(false);

		useEffect(() => {

			async function getRandomHamster() {
				
				try {
					const response1 = await fetch('/hamsters/random', {method: 'GET'});
					console.log(response1);
					const response2 = await fetch('/hamsters/random', {method: 'GET'});
					console.log(response2);

					if(response1.status && response2.status === 200) {
						const data1 = await response1.json();
						const data2 = await response2.json();

						if(data1.id === data2.id) {
							getRandomHamster();
						}
						setHamster1(data1);
						setHamster2(data2)
						console.log(data1, data2);
					}
				} catch(error) {
					console.log(error);
				}
			}

			getRandomHamster();
			
		}, [])

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

		const randomHamster1 = () => {

			if(!hamster1 || !hamster2) {
				return;
			}

			setWinnerHamster1(true);

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
			console.log(winner);
		}

		const randomHamster2 = () => {

			if(!hamster2 || !hamster1) {
				return;
			}

			setWinnerHamster2(true);

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
			console.log(winner);
		}


		return (
			<div className="battle-view">
				<h1>Hamster Battle</h1>
				<div className="battle-container">
					<div className="hamster-1" onClick={randomHamster1}>
						<HamsterCard hamster={hamster1}/>
					</div>
					<div className="hamster-2" onClick={randomHamster2}>
						<HamsterCard hamster={hamster2}/>
					</div>
				</div>
				<p>The cuteness is strong with these ones.
					It's time to choose your favorite.<br />
					May the cutest hamster win!</p>
			</div>
		)
	}	

export default BattleView;