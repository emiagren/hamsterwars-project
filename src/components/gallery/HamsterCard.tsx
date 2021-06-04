import { HamsterResponse } from '../../types/HamsterInterface';
import './HamsterCard.css';

const HamsterCard = ({hamster}:HamsterResponse) => {

	if (hamster === null) return null;

	return (
		<div className="hamster-card">
			<img src={`img/${hamster.imgName}`} alt="Super cute hamster" />
			<h3> {hamster.name} </h3>
			<p> Click me! </p>
		</div>
	);
};

export default HamsterCard;