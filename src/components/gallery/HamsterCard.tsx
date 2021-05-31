import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterObject } from '../../types/HamsterInterface';
import HamsterModal from './HamsterModal';
import './HamsterCard.css';

interface HamsterResponse {
	hamster: null | HamsterObject;
};

const HamsterCard = ({hamster}:HamsterResponse) => {

	const [hamsters] = useRecoilState(hamstersAtom);
	const [showModal, setShowModal] = useState(false);
	// const [hamsterInfo, setHamsterInfo] = useState<null | HamsterObject>(null)

	const toggleModal = () => {
		setShowModal(!showModal);
	}

	if (hamster === null) return null;
	const hamsterImg = `img/${hamster.imgName}`;

	return (
		<div className="hamster-card">
			<img src={hamsterImg} alt="Super cute hamster" />
			<h3> {hamster.name} </h3>
			<p className="hamster-info" onClick={toggleModal}> Info </p>
			<HamsterModal 
			title={"Hamster Info"} 
			isOpen={showModal} 
			onClose={toggleModal}
			/>
			{/* <HamsterModal showModal={showModal} setShowModal={setShowModal} /> */}
		</div>
	);
};

export default HamsterCard;