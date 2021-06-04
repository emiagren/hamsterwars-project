import { useState, useEffect } from 'react';
import HamsterCard from './../gallery/HamsterCard';
import { HamsterObject } from '../../types/HamsterInterface';
import './BattleView.css'

const BattleView = () => {

	const [hamster1, setHamster1] = useState<HamsterObject | null>(null);
	const [hamster2, setHamster2] = useState<HamsterObject | null>(null);
	const [winningHamster, setWinningHamster] = useState<any>(null);
	const [losingHamster, setLosingHamster] = useState<any>(null);

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

		async function voteForHamster(winner: HamsterObject | null, loser: HamsterObject | null) {
	
			if( winner && loser ) {

				const hamsterWinner = {
					wins: winner.wins + 1,
					games: winner.games + 1
				}
			
				const hamsterLoser = {
					defeats: loser.defeats + 1,
					games: loser.games + 1
				}

				try {
				
				Promise.all([
					putHamster(winner.dbId, hamsterWinner),
					putHamster(loser.dbId, hamsterLoser),
					postMatch(winner.dbId, loser.dbId)
				]).then(() => {
					updateHamster(winner, loser);
					console.log(hamsterWinner, hamsterLoser)
				})
				} catch(error) {
					console.log(error);
				}
				
			}		
		}
			
		async function getHamsterId(dbId: string) {

			try {
				const response = await fetch(`/hamsters/${dbId}`, {method: 'GET'})

				if(response.status === 200) {
					const data = await response.json();
					console.log(data);
				}
			} catch(error) {
				console.log(error);
			}	
		}
	
		async function putHamster(dbId: string, updateHamster: any) {

			try {
				const response = await fetch(`/hamsters/${dbId}`, {method: 'PUT', headers: {
					'Content-type': 'application/json'}, body: JSON.stringify(updateHamster)});
				if(response.status === 200) {
					const data = await response.text();
					console.log(data);
				}	
			} catch(error) {
				console.log(error);
			}	
		}
	
		async function postMatch(winnerId: string, loserId:string) {
			
			const match = {winnerId: winnerId, loserId: loserId};

			try {
				const response = await fetch('/matches', {method: 'POST', headers: {
					'Content-type': 'application/json'}, body: JSON.stringify(match)});
				if(response.status === 200)	{
					const data = await response.text();
					console.log(data);
				}
			} catch(error) {
				console.log(error);
			}
		}

		async function updateHamster(winner: any, loser: any) {
			const matchWinner = getHamsterId(winner.dbId);
			const matchLoser = getHamsterId(loser.dbId);
			setWinningHamster(matchWinner);
			setLosingHamster(matchLoser);
		}

		console.log('Winner: ' + winningHamster);
		console.log('Loser: ' + losingHamster);

		return (
			<div className="battle-view">
				<h1>Hamster Battle</h1>
				<div className="battle-container">
					<div className="warrior-1" onClick={() => voteForHamster(hamster1, hamster2)}>
						<HamsterCard hamster={hamster1}/>
					</div>
					<div className="warrior-2" onClick={() => voteForHamster(hamster1, hamster2)}>
						<HamsterCard hamster={hamster2}/>
					</div>
				</div>
				<p>The cuteness is strong with these ones.
					It's time to choose your warrior.<br />
					May the best hamster win!</p>
			</div>
		)
	}

export default BattleView;