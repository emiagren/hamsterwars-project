import { useEffect, useRef, useState } from 'react';
import { HamsterResponse, HamsterObject } from '../../types/HamsterInterface';
import { ModalProps } from '../../types/ModalInterface';
import './HamsterCard.css';

const HamsterCard = ({hamster}:HamsterResponse) => {

	const [showInfo, setShowInfo] = useState(false);
	// const [showCards, setShowCards] = useState(true);
	// const showHamsterInfo = () => {
	// 	setShowInfo(true);
	// 	// setShowCards(false);
	// }
	// const closeHamsterInfo = () => {
	// 	setShowInfo(false);
	// 	// setShowCards(true);
	// }

	async function deleteHamster(hamster: HamsterObject) {
	await fetch(`/hamsters/${hamster.dbId}`, {method: 'DELETE'});
		console.log(hamster);
	}

	if (hamster === null) return null;

	return (
		<div>
			<div>
				<div className="hamster-card" 
				onMouseEnter={() => setShowInfo(true)}
				onMouseLeave={() => setShowInfo(false)}>
					<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
					<h3> {hamster.name} </h3>
					{/* <button onClick={showHamsterInfo}>Get to know me</button> */}
				</div> 
				
				{ showInfo ?
				<div className="hamster-info">
					{/* <img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
					<h3> {hamster.name} </h3> */}
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
					{/* <button onClick={closeHamsterInfo}>Close</button> */}
					<button onClick={() => deleteHamster(hamster)}>Delete</button>
				</div> : null	}
			</div>
		</div>	
	);
};

export default HamsterCard;