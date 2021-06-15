import { Link } from 'react-router-dom';
import './StartView.css';

const StartView = () => {

	return (
		<div className="start-view">

			<div className="img-container">
				<img className="hamster-jedi "src="hamster_jedi.png" alt="cute hamster" />
			</div>

			<div className="text-container">
				<h1> HamsterWars </h1>

				<p>	
					Hamsters are mighty cute and they know it.
					Now it's up to you to decide who is just a tad cuter. View the gallery
					of tiny warriors or go to battle right away and watch the fight
					between two randomly selected hamsters. <br /> 
					The one you pick will have your points. <br /><br /> 
					Maybe you know an even cuter one that we can add to the list? 
				</p>

				<p>This is where the fun begins!</p>

				<div>
					<Link to="/gallery"><button> Gallery </button></Link>
					<Link to="/battle"><button> Battle </button></Link>
				</div>
			</div>



		</div>
	)
}

export default StartView;