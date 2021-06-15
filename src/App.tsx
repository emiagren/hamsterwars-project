import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { hamstersAtom } from '../src/atoms/atoms';
import { HamsterObject } from './types/HamsterInterface';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import StartView from './components/start/StartView';
import BattleView from './components/battle/BattleView';
import GalleryView from './components/gallery/GalleryView';
import StatisticsView from './components/statistics/StatisticsView';
import HistoryView from './components/history/HistoryView';
import ErrorView from './components/error/ErrorView';


function App() {	

	const [hamsters, setHamsters] = useRecoilState(hamstersAtom);

	useEffect(() => {

		async function getHamsters() {

			try{		
				const response = await fetch('/hamsters', {method: 'GET'});
				console.log(response);

				const data: HamsterObject[] = await response.json();
				setHamsters(data);
				console.log(data);

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
				<Link to='/'> HOME </Link>
				<NavLink to='/battle'> BATTLE </NavLink>
				<NavLink to='/gallery'> GALLERY </NavLink>
				<NavLink to='/statistics'> STATISTICS </NavLink>
				<NavLink to='/history'> HISTORY </NavLink>
			</nav>
		</header>
		<main>	
			{hamsters ?
			<Switch>
				<Route path="/battle">< BattleView /></Route>
				<Route path="/gallery">< GalleryView /></Route>
				<Route path="/statistics">< StatisticsView /></Route>
				<Route path="/history">< HistoryView /></Route>
				<Route path="/">< StartView /></Route>
			</Switch>

			: 
				<ErrorView />
			}
		</main>
		</div>
		</Router>  
	);
}

export default App;
