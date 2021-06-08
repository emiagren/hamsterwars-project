// import { useRecoilState } from 'recoil';
// import { hamstersAtom } from '../../atoms/atoms';
import { useRef, useState } from 'react';
import { ModalProps } from '../../types/ModalInterface';
import { HamsterObject } from '../../types/HamsterInterface';
// import HamsterInfo from './HamsterInfo';
import './HamsterModal.css';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

	const [hamster] = useState< HamsterObject | null >(null)
	const overlayRef = useRef(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (e.target === overlayRef.current) {
			onClose();
		}
	}

	if (hamster === null) return null;

	return isOpen ? (
		<div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
			<div className="modal-box">
				<div className="modal-close" onClick={onClose}> X </div>
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
				</div>
			</div>
	): null;
}

export default Modal;