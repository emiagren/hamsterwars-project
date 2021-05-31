
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../../atoms/atoms';
import { HamsterObject } from '../../types/HamsterInterface';
import HamsterCard from './HamsterCard';
import './GalleryView.css';

const GalleryView = () => {

	const [hamsters] = useRecoilState(hamstersAtom);

	return (
		<div className="gallery">
			<h1>Hamster Gallery</h1>
			<div className="gallery-container">
				{hamsters.length > 0 ? hamsters.map(hamster =>
					<div key={hamster.dbId}>
						<HamsterCard hamster={hamster}/>
					</div>) 
				: <p>Fetching hamster...</p>
				}
			</div>	
		</div>
	)
}

export default GalleryView;