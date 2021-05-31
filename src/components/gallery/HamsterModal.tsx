import React from 'react';
import { useState } from 'react';
import { ModalProps } from '../../types/ModalInterface';

const HamsterModal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => isOpen ? (
	<div className="modal">
		<div className="modal-overlay">
			<div className="modal-box">
				<div className="modal-close"> X </div>
			</div>
		</div>
	</div>
): null;

// const HamsterModal = ({showModal, setShowModal}) => {

// 	const [showModal, setShowModal] = useState(false);

// 	return (
// 		<div>{ showModal ? <div> Modal </div> : null }</div>
// 	)
// }

export default HamsterModal;