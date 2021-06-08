
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import HamsterCard from './HamsterCard';
import HamsterModal from './HamsterModal';
import HamsterForm from './HamsterForm';
import './GalleryView.css';

const GalleryView = () => {

	const [hamsters] = useRecoilState(hamstersAtom);
	const [showModal, setShowModal] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => {
		setShowForm(!showForm);
	}

	const toggleModal = () => {
		setShowModal(!showModal);
	}

	return (
		<div className="gallery">
			<HamsterForm content={hamsters} 
			isOpen={showForm} onClose={toggleForm}/>
			
			<h1> Hamster Gallery </h1>
			<button onClick={toggleForm}> Add new hamster </button>
			<div className="gallery-container">
				{hamsters.length > 0 ? hamsters.map(hamster =>
					<div key={hamster.dbId} onClick={toggleModal}>
						<HamsterCard hamster={hamster}/>
						{/* <HamsterModal content={hamster}
			isOpen={showModal} onClose={toggleModal}/> */}
					</div>) 
				: <p>Loading hamster...</p>
				}
			</div>	
		</div>
	)
}

export default GalleryView;