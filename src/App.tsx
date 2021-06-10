import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../src/atoms/atoms';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import StartView from './components/start/StartView';
import BattleView from './components/battle/BattleView';
import GalleryView from './components/gallery/GalleryView';
import HistoryView from './components/history/HistoryView';
import { HamsterObject } from './types/HamsterInterface';


function App() {	

	const [hamsters, setHamsters] = useRecoilState(hamstersAtom);

	useEffect(() => {

		async function getHamsters() {

			try{		
				const response = await fetch('/hamsters', {method: 'GET'});
				console.log(response);

				if (response.status ! === 200) {
				const data: HamsterObject[] = await response.json();
				setHamsters(data);
				console.log(data);
				}

			} catch(error) {
				console.log(error);
			}	
		}

		getHamsters();
			
	}, [])

	return (
		<Router>
		<div className="App">
		<header className="App-header">
			<nav>
				<Link to='/'> START </Link>
				<NavLink to='/battle'> BATTLE </NavLink>
				<NavLink to='/gallery'> GALLERY </NavLink>
				<NavLink to='/history'> HISTORY </NavLink>
			</nav>
		</header>
		<main>	
			<Switch>
				<Route path="/battle">< BattleView /></Route>
				<Route path="/gallery">< GalleryView /></Route>
				<Route path="/history">< HistoryView /></Route>
				<Route path="/">< StartView /></Route>
			</Switch>
		</main>
		</div>
		</Router>  
	);
}

export default App;
