import { useState, useEffect } from 'react'; 
import { MatchObject } from '../../types/MatchInterface';

const HistoryView = () => {

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

	return (
		<div>
			<h1>History</h1>
		</div>
	)
}

export default HistoryView;