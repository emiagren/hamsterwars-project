
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterObject } from '../../types/HamsterInterface';
import HamsterCard from './HamsterCard';
import HamsterForm from './HamsterForm';
import './GalleryView.css';

const GalleryView = () => {

	const [hamsters] = useRecoilState(hamstersAtom);
	const [showForm, setShowForm] = useState(false);

	const toggleForm = () => {
		setShowForm(!showForm);
	}

	async function deleteHamster(hamster: HamsterObject) {
	await fetch(`/hamsters/${hamster.id}`, {method: 'DELETE'});
	console.log(hamster.name)
	console.log(hamster.id)

	window.location.reload()
	}

	return (
		<div className="gallery">

			<HamsterForm content={hamsters} 
			isOpen={showForm} onClose={toggleForm}/>
			
			<h1> Hamster Gallery </h1>

			<p> Click on the hamster you want to learn more about or add your own champion below. </p>

			<button onClick={toggleForm}> Add a new hamster </button>

			<div className="gallery-container">
				{hamsters.length > 0 ? hamsters.map(hamster =>
					<div key={hamster.id}>
						<HamsterCard hamster={hamster}/>
						<button className="delete-btn" onClick={() => deleteHamster(hamster)}>Delete hamster</button>
					</div>) 
				: <p>Loading hamster...</p>
				}
				
			</div>	
		</div>
	)
}

export default GalleryView;