import { useState, useEffect } from 'react';
import { HamsterResponse, HamsterObject} from '../../types/HamsterInterface';

const Battle = () => {

	const [hamster1, setHamster1] = useState<HamsterObject | null>(null);
	const [hamster2, setHamster2] = useState<HamsterObject | null>(null);

		useEffect(() => {

			async function getRandomHamster() {
				const response1 = await fetch('/hamsters/random', {method: 'GET'});
				console.log(response1);
				const response2 = await fetch('/hamsters/random', {method: 'GET'});
				console.log(response2);
				// if (response.status ! === 200) setDataBaseCall(false);
				const data1 = await response1.json();
				const data2 = await response2.json();
				setHamster1(data1);
				setHamster2(data2)
				console.log(data1, data2);
			}

			getRandomHamster();
			
		}, [])

	
	async function voteForHamster(winner: HamsterObject, loser: HamsterObject) {
	
		const winningHamster = {
			wins: winner.wins + 1,
			games: winner.games + 1
		}
	
		const losingHamster = {
			defeats: loser.defeats + 1,
			games: loser.games + 1
		}

		putHamster(winner.dbId, winningHamster);
		putHamster(loser.dbId, losingHamster);
		postMatch(winner.dbId, loser.dbId);
		console.log('Winner: ' + winner);
	}
		

	async function getHamsterId(dbId: string) {
		const response = await fetch(`/hamsters/${dbId}`, {method: 'GET'})
		const data = await response.json();
		console.log(data);
	}

	async function putHamster(dbId: string, updateHamster: any) {
		const response = await fetch(`/hamsters/${dbId}`, {method: 'PUT', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(updateHamster)});
		const data = await response.text();
		console.log(data);
	}

	async function postMatch(winnerId: string, loserId:string) {
		const match = {winnerId: winnerId, loserId: loserId};
		const response = await fetch('/matches', {method: 'POST', headers: {
			'Content-type': 'application/json'}, body: JSON.stringify(match)});
		const data = await response.text();
		console.log(data);
	}
	
}

export default Battle;