// import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { hamstersAtom } from '../../atoms/atoms';
import { HamsterResponse } from '../../types/HamsterInterface';
import './HamsterCard.css';

const HamsterInfo = ({hamster}:HamsterResponse) => {

	// const [hamsters] = useRecoilState(hamstersAtom);

	if (hamster === null) return null;

	return (
		<div className="hamster-info">
			<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
			<h3> {hamster.name} </h3>
			<p> Hello there! <br/>
				My name is {hamster.name} and I am {hamster.age} years of cute. Most of the time <br />
				I love to {hamster.loves} and my favorite thing to eat is {hamster.favFood}. <br />
				Nice to meet you! 
			</p>
			<p>Wins: {hamster.wins}</p><br />
			<p>Defeats: {hamster.defeats}</p><br />
			<p>Matches: {hamster.games}</p>
		</div>
	);
};

export default HamsterInfo;