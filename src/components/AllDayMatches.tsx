import SingleMatch from './SingleMatch';
import NavButton from './NavButton';
import type { UpdateStats } from '../App';
import type { Team } from '../data/data';

type AllDayMatchesProps = {
	curDay: number;
	dayMatches: Team[][];
	teams: { [key: string]: Team };
	onUpdate: (obj: UpdateStats) => void;
	onSimulate: (results: number[][]) => void;
	onPrevDay: () => void;
	onNextDay: () => void;
	nextToBeSim: boolean;
	goalsScored: number[][];
};

export default function AllDayMatches({
	dayMatches,
	curDay,
	teams,
	onUpdate,
	onSimulate,
	goalsScored,
	nextToBeSim,
	onPrevDay,
	onNextDay,
}: AllDayMatchesProps): JSX.Element {
	// DETERMINES HOW MANY GOAL CHANCES EACH TEAM CREATES
	const getChances = function (attacker: Team, defender: Team): number[] {
		return new Array(
			Math.round(
				(Math.random() * attacker.build * 0.33 + attacker.build * 0.66) /
					(Math.random() * defender.def * 0.33 + defender.def * 0.66)
			) + 2
		).fill(0);
	};
	// DETERMINES HOW MANY CHANCES ARE CONVERTED INTO GOALS
	const getGoalsScored = function (
		chances: number[],
		attacker: Team,
		defender: Team
	): number {
		const goals = chances.reduce((acc, cur, i) => {
			return Math.random() * (attacker.atk - 0.15 ** i) >
				Math.random() * defender.def
				? acc + 1
				: acc + 0;
		}, 0);
		return goals > 6 ? 6 : goals;
	};
	// DETERMINES THE WINNER OF EACH MATCH AND LIFTS UP THE STATE TO APP COMP.
	const simulateAllMatchesHandler = function () {
		const results = dayMatches.map((match) => {
			const teamHome = match[0];
			const teamAway = match[1];

			const homeChances = getChances(teamHome, teamAway);
			const awayChances = getChances(teamAway, teamHome);

			let goalsHome = getGoalsScored(homeChances, teamHome, teamAway);
			let goalsAway = getGoalsScored(awayChances, teamAway, teamHome);

			if (goalsHome > goalsAway) {
				onUpdate({
					name: teamHome.name,
					score: goalsHome,
					concede: goalsAway,
					pts: 3,
				});
				onUpdate({
					name: teamAway.name,
					score: goalsAway,
					concede: goalsHome,
					pts: 0,
				});
			} else if (goalsHome === goalsAway) {
				onUpdate({
					name: teamHome.name,
					score: goalsHome,
					concede: goalsAway,
					pts: 1,
				});
				onUpdate({
					name: teamAway.name,
					score: goalsAway,
					concede: goalsHome,
					pts: 1,
				});
			} else {
				onUpdate({
					name: teamAway.name,
					score: goalsAway,
					concede: goalsHome,
					pts: 3,
				});

				onUpdate({
					name: teamHome.name,
					score: goalsHome,
					concede: goalsAway,
					pts: 0,
				});
			}

			return [goalsHome, goalsAway];
		});

		onSimulate(results);
	};

	const nextHandler = () => {
		onNextDay();
	};
	const prevHandler = () => {
		onPrevDay();
	};

	//DETERMINES WHAT TO PASS A DAYRESULTS PROP TO THE SINGLEMATCH COMP. /EMPTY ARRAY IS FOR WHEN RESULTS HAVEN'T BEEN CALCULATED YET

	const dayResults = goalsScored ? goalsScored : [];

	return (
		<div className='flex gap-2 p-3 shadow-md rounded flex-col items-start justify-start w-full text-xl whitespace-nowrap from-slate-900 to-slate-700 bg-gradient-to-r text-slate-100'>
			<div className='flex justify-center items-center w-full  p-2'>
				<h3 className='text-2xl text-center mb-4'> Day {curDay + 1}</h3>{' '}
			</div>
			{dayMatches?.map((match, i) => (
				<SingleMatch
					match={match}
					teams={teams}
					key={i}
					dayResults={dayResults[i]}
				/>
			))}
			<div className='flex justify-center items-center gap-4 text-center w-full  h-24'>
				<NavButton onClick={prevHandler} isAct={curDay > 0}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M15.75 19.5L8.25 12l7.5-7.5'
						/>
					</svg>
				</NavButton>
				<NavButton
					style={{ paddingLeft: 12, paddingRight: 12 }}
					isAct={!goalsScored && nextToBeSim}
					onClick={simulateAllMatchesHandler}
				>
					simulate
				</NavButton>
				<NavButton isAct={curDay < 37} onClick={nextHandler}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke-width='1.5'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							d='M8.25 4.5l7.5 7.5-7.5 7.5'
						/>
					</svg>
				</NavButton>
			</div>
		</div>
	);
}
