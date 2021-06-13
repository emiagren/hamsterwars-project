import { useState } from 'react';
import { useRecoilState } from 'recoil'
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterResponse, HamsterObject } from '../../types/HamsterInterface';
import './HamsterCard.css';

const HamsterCard = ({hamster}:HamsterResponse) => {

	// const [clickedHamster, setClickedHamster] = useState<HamsterObject[] | null>(null);
	const [clickedHamster, setClickedHamster] = useRecoilState(hamstersAtom);
	const [showInfo, setShowInfo] = useState(false);
	const [showCards, setShowCards] = useState(true);
	
	const showHamsterInfo = () => {
		setShowInfo(true);
		setShowCards(false);
	}
	const closeHamsterInfo = () => {
		setShowInfo(false);
		setShowCards(true);
	}		

	async function deleteHamster(hamster: HamsterObject) {
		await fetch(`/hamsters/${hamster.id}`, {method: 'DELETE'});
		console.log(hamster.name)
		console.log(hamster.id)
	}

	if (hamster === null) return null;

	return (
		<div>
			<div>
				{showCards ?
				<div className="hamster-card" onClick={showHamsterInfo}>
					<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
					<h3> {hamster.name} </h3>
					{/* <button onClick={showHamsterInfo}>Get to know me</button> */}
				</div> : null }
				
				{ showInfo ?
				<div className="overlay">
					<div className="content-box">
						<div className="hamster-info">
						<img src="/cross.png" className="close" onClick={closeHamsterInfo}/>
							<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
							<h3> {hamster.name} </h3>
							<p> Hello there! <br/>
								My name is {hamster.name} and I am {hamster.age} years of cute. Most of the time <br />
								I love to {hamster.loves} and my favorite thing to eat is {hamster.favFood}. <br />
								Nice to meet you!
							</p>
							<div className="hamster-stats">
								<p>Wins: {hamster.wins}</p><br />
								<p>Defeats: {hamster.defeats}</p><br />
								<p>Matches: {hamster.games}</p>
							</div>
							<button className="delete-btn" onClick={() => deleteHamster(hamster)}>Delete?</button>

						</div>
					</div>
				</div> : null	}
			</div>
		</div>	
	);
};

export default HamsterCard;