import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import { useRef } from 'react';
import { ModalProps } from '../../types/ModalInterface';
import { HamsterObject } from '../../types/HamsterInterface';
import HamsterInfo from './HamsterInfo';
import './HamsterModal.css';

const HamsterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

	const [hamster] = useRecoilState(hamstersAtom);
	const overlayRef = useRef(null);

	const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (e.target === overlayRef.current) {
			onClose();
		}
	}

	return isOpen ? (
		<div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
			<div className="modal-box">
				<div className="modal-close" onClick={onClose}> X </div>
				<div className="hamster-info">
					{/* <HamsterInfo hamster={hamster}/> */}
				</div>
				</div>
			</div>
	): null;
}

export default HamsterModal;