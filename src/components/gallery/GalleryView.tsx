
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import HamsterCard from './HamsterCard';
import HamsterForm from './HamsterForm';
import './GalleryView.css';

const GalleryView = () => {

	const [hamsters] = useRecoilState(hamstersAtom);
	// const [showInfo, setShowInfo] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => {
		setShowForm(!showForm);
	}

	// const toggleInfo = () => {
	// 	setShowInfo(!showInfo);
	// }

	return (
		<div className="gallery">

			<HamsterForm content={hamsters} 
			isOpen={showForm} onClose={toggleForm}/>
			
			<h1> Hamster Gallery </h1>

			<p> Click on the hamster you want to learn more about. </p>

			<button onClick={toggleForm}> Add new hamster </button>

			<div className="gallery-container">
				{hamsters.length > 0 ? hamsters.map(hamster =>
					<div key={hamster.id}>
						<HamsterCard hamster={hamster}/>
					</div>) 
				: <p>Loading hamster...</p>
				}
				
			</div>	
		</div>
	)
}

export default GalleryView;