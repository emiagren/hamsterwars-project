import { useState, useEffect } from 'react'; 
import { useRecoilState } from 'recoil';
import { MatchObject } from '../../types/MatchInterface';
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterObject } from '../../types/HamsterInterface';
import './HistoryView.css'

const HistoryView = () => {

	const [hamsters, setHamsters] = useRecoilState(hamstersAtom);
	const [matches, setMatches] = useState<MatchObject[] | null>(null);
	const [updateMatches, setupdateMatches] = useState(false);

	useEffect(() => {

		async function getMatches() {
		
				const response = await fetch('/matches', {method: 'GET'});
				const data: MatchObject[] = await response.json();
				setMatches(data);
				setupdateMatches(false);
				console.log(data);
		}

		getMatches();
			
	}, [updateMatches])

	useEffect(() => {

		async function getHamsters() {
		
				const response = await fetch('/hamsters', {method: 'GET'});
				const data: HamsterObject[] = await response.json();
				setHamsters(data);
		}

		getHamsters();
			
	}, [])

	async function deleteMatch(match: MatchObject) {
		await fetch (`/matches/${match.id}`, {method: "DELETE"})
		setupdateMatches(true);
	}

	return (
		<div className="history-view">

			<h1> History </h1>

			<p> Below you can view previously fought hamster battles and their results.</p>

			<div className="match-hamster">
				{matches ? matches.map(match => {
					if(!hamsters) return
					const winner = hamsters.find((hamster) => hamster.id === match.winnerId);
					const loser = hamsters.find((hamster) => hamster.id === match.loserId);
					if(!winner || !loser) return <div>
						<p> This battle never took place. </p>
						<button onClick={() => deleteMatch(match)}>Delete match?</button>
						</div>
					
					
					return (
						<div className="history-container">
							<div className="battle-wrap">
								<div className="battle-container">

									<div>
										<div className="hamster-card" key={match.winnerId}>
											<img src={`img/${winner.imgName}`} alt="Super cute hamster" />
											<h3> {winner.name} </h3>
										</div>
											<h2 className="winner"> WINNER </h2>
									</div>

									<div className="versus"><h2>VS</h2></div>

									<div>
										<div className="hamster-card" key={match.loserId}>
											<img src={`img/${loser.imgName}`} alt="Super cute hamster" />
											<h3> {loser.name} </h3>
										</div>
											<h2 className="loser"> LOSER </h2>
									</div>

								</div>

								<button className="dlt-btn" onClick={() => deleteMatch(match)}>Delete match?</button>
								
							</div>
						</div>
					)
				}): <p> Loading previous battles... </p> }

			</div>
			
		</div>
	)
}

export default HistoryView;