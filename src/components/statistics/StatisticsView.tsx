import { useState, useEffect } from 'react';
import { HamsterObject } from '../../types/HamsterInterface';
import HamsterCard from '../gallery/HamsterCard';
import './StatisticsView.css';

const StatisticsView = () => {

	const [winners, setWinners] = useState<HamsterObject[] | null>(null);
	const [losers, setLosers] = useState<HamsterObject[] | null>(null);

	useEffect(() => {
		async function getWinners() {
		
			const response = await fetch('/winners', {method: 'GET'});
			const data: HamsterObject[] = await response.json();
			setWinners(data);
		}
		async function getLosers() {
		
			const response = await fetch('/losers', {method: 'GET'});
			const data: HamsterObject[] = await response.json();
			setLosers(data);
		}
		getWinners();
		getLosers();
	}, [])

	return (
		<div className="stat-container">
			
			<h1>Statistics</h1>

			<div className="stat-wrap">
		
				<div className="winners-wrap">
					<h2 className="top-five">Top five winners</h2>
					{winners ? winners.map(winner => (
						<div className="card-wrap">
							{/* <div className="hamster-card" key={winner.id}>
								<img src={`img/${winner.imgName}`} alt="Super cute hamster" />
								<h3> {winner.name} </h3> */}
								<HamsterCard hamster={winner} key={winner.id}/>
								<div className="hamster-stats">
									<p>Wins: {winner.wins}</p>
									<p>Defeats: {winner.defeats}</p>
									<p>Games: {winner.games}</p>
								</div>
						</div>
					)): <p> Loading hamster... </p> }
				</div>

				<div className="losers-wrap">
					<h2 className="top-five">Top five losers</h2>
					{losers ? losers.map(loser => (
						<div className="card-wrap">
							{/* <div className="hamster-card" key={loser.id}>
								<img src={`img/${loser.imgName}`} alt="Super cute hamster" />
								<h3> {loser.name} </h3> */}
								<HamsterCard hamster={loser} key={loser.id}/>
								<div className="hamster-stats">
									<p>Wins: {loser.wins}</p>
									<p>Defeats: {loser.defeats}</p>
									<p>Games: {loser.games}</p>
								</div>
						</div>
					)): <p> Loading hamster... </p> }
				</div>

			</div>

		</div>	
	)
}

export default StatisticsView;