import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterResponse, HamsterObject } from '../../types/HamsterInterface';
import { MatchObject } from '../../types/MatchInterface';
import './HamsterCard.css';

const HamsterCard = ({hamster}:HamsterResponse) => {

	const [hamsters, setHamsters] = useRecoilState(hamstersAtom);
	const [defeated, setDefeated] = useState<MatchObject[] | null>(null);
	const [showInfo, setShowInfo] = useState(false);
	const [showDefeated, setShowDefeated] = useState(false);
	
	const showHamsterInfo = () => {
		setShowInfo(true);
	}
	const closeHamsterInfo = () => {
		setShowInfo(false);
	}
	const closeDefeated = () => {
		setShowDefeated(false);
	}	

	async function getHamsters() {
		
		const response = await fetch('/hamsters', {method: 'GET'});
		const data: HamsterObject[] = await response.json();
		setHamsters(data);
	}
	
	async function getDefeated(hamster: HamsterObject) {
		
		const response = await fetch(`/matchwinners/${hamster.id}`, {method: 'GET'});
		if(response.status === 200) {
		const data: MatchObject[] = await response.json();
		setDefeated(data);
		getHamsters();
		setShowDefeated(true);
		} else {
			setDefeated([]);
		}
	}

	function showDefeatedHamsters() {
		if (hamsters && defeated) {
			return (
				<div className="defeated">
					{defeated ? defeated.map(loser => {
						if(!hamsters) return <p> No hamsters found... </p>;

						let foundId = hamsters.find(({id}) => id === loser.loserId);

						if(!foundId) return <p> This hamster seems to have been deleted... </p>

						return (
							<div className="defeated-id" key={foundId.id}>
								<img className="defeated-img" src={`img/${foundId.imgName}`} alt="super cute hamster" />
								<p>{foundId.name}</p>
							</div>
						)
					}): <p> Loading defeated hamsters... </p>}
				</div>
			)
		}
	}

	const showDef = showDefeatedHamsters();

	if (hamster === null) return null;

	return (
		<div>
			<div>
				{ !showInfo ?
				<div className="hamster-card" onClick={showHamsterInfo}>
					<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
					<h3> {hamster.name} </h3>
				</div> : null }

				{ showInfo ?
					<div className="content-box">
						<div className="hamster-info" onClick={closeHamsterInfo}>
						<img src="/cross.png" className="close" alt="cross" onClick={closeHamsterInfo}/>
							<h3> Hello there! </h3>
							<p>	
								My name is {hamster.name} and I am {hamster.age} years of cute. Most of the 	time I love to {hamster.loves} and my favorite thing to eat is {hamster.favFood}.
							</p>
							<p>Nice to meet you!</p>
							<br/>
							<p className="click" onClick={() => getDefeated(hamster)}>Click <strong>here</strong> to see who I defeated.</p>
						</div>
				</div>: null	}
				{showDefeated ?
				<div className="show-defeated">
					<img src="/cross.png" className="close" alt="cross" onClick={closeDefeated}/>
					{showDef}
				</div>: null }
			</div>
		</div>	
	);
};

export default HamsterCard;