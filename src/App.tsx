import { useState } from 'react';
import AllDayMatches from './components/AllDayMatches';
import Button from './components/Button';
import Table from './components/Table';
import { teamsCollection, teams } from './data/data';
import type { Team } from './data/data';

type UpdateStats = {
	name: string;
	score: number;
	concede: number;
	pts: number;
};

function App() {
	// STATE THAT HOLDS ALL THE MATCHES FOR THE CURRENT CALENDAR (PASSED TO ALLDAYMATCHES COMP.)
	const [allMatches, setAllMatches] = useState<Team[][][]>([]);
	// DETERMINES WHICH DAY OF THE CHAMPIONSHIP FIXTURES SHOULD BE VISIBLE IN THE UI
	const [curDay, setDay] = useState(0);
	// RESPONSIBLE FOR HOLDING DATA SHOWN IN THE TABLE COMPONENT
	const [teamsTab, setTeamsTab] = useState({ ...teamsCollection });
	// RESPONSIBLE FOR HOLDING GOALSSCORED, PASSED TO ALLDAYMATCHES COMP IN ORDER TO SHOW RESULTS
	const [goalsScored, setGoalsScored] = useState<number[][][]>([]);

	////RANDOMLY GENERATES CALENDAR
	teams.sort(() => Math.random() - 0.5);

	const matchmaking = function () {
		let team1: string;
		let team2: string;
		let home: Team;
		let away: Team;
		// ARRAY THAT HOLDS MATCHES DATA
		let matches: Team[][] = [];
		/// LOOPS OVER THE ARRAY AND MATCHES TWO TEAMS
		for (let i = teams.length - 1; i >= 0; i -= 2) {
			team1 = teams[i];
			team2 = teams[teams.length - 1 - i];
			// BASED ON THE NUMBER OF MATCHES ALREADY PLAYED HOME, DETERMINES WHICH TEAM WILL BE THE HOST
			if (
				teamsCollection[team1].playedHome < teamsCollection[team2].playedHome
			) {
				home = teamsCollection[team1];

				away = teamsCollection[team2];
			} else {
				home = teamsCollection[team2];
				away = teamsCollection[team1];
			}
			/// INCREASES THE PLAYEDHOME PROPERTY OF THE HOST TEAM
			teamsCollection[home.name].playedHome++;
			//PUSHES AN ARRAY WITH THE TWO TEAM INTO THE MATCHES ARRAY
			matches.push([home, away]);
		}
		// RANDOMIZES THE ORDER OF THE MATCHES IN A SINGLE CHAMPIONSHIP DAY, THAN RETURN THE MATCHES
		matches.sort(() => Math.random() - 0.5);

		return matches;
	};

	const generateCalendarHandler = function () {
		const matchesHolder: Team[][][] = [];
		// CALLS THE MATCHMAKING FUNCTION FOR THE FIRST HALF OF THE GAMES
		for (let j = 1; j <= 19; j++) {
			let matches = matchmaking();
			// TAKES THE LAST TEAM AND PUT IT AT THE 2ND POSITION IN THE ARRAY
			teams.splice(1, 0, teams[teams.length - 1]);
			// DELETES THE LAST ITEM (THAT HAD A COPY AT INDEX 1)
			teams.pop();
			//PUSHES RESULTS IN MATCHESHOLDER ARRAY

			matchesHolder.push(matches);
		}
		// UPDATE STATES, WITH MATCHES OF THE FIRST HALF OF THE CHAMPIONSHIP, THAN REVERSE THE ORDER OF THE SECOND HALF
		setAllMatches([
			...matchesHolder,
			...matchesHolder.map((match) => match.reverse()),
		]);
	};
	// HANDLERS OF THE PREV NEXT BUTTONS
	const nextDayHandler = function (): void {
		setDay((day) => day + 1);
	};

	const prevDayHandler = () => {
		if (curDay > 0) setDay((day) => day - 1);
	};
	// UPDATES STATE GOALSSCORED
	const simulateHandler = function (results: number[][]): void {
		setGoalsScored([...goalsScored, results]);
	};

	// UPDATES STATS FOR THE TABLE (DATA PASSED BY THE ALLDAYMATCHES COMPONENT)
	const updateStatsHandler = function ({
		name,
		score,
		concede,
		pts,
	}: UpdateStats): void {
		let curTeam = teamsTab[name];
		teamsTab[name] = {
			...curTeam,
			scored: curTeam.scored + score,
			conceded: curTeam.conceded + concede,
			points: curTeam.points + pts,
		};
		//UPDATES STATE (PASSED TO TABLE COMPONENT)
		setTeamsTab({
			...teamsTab,
		});
	};

	// DETERMINES WETHER THE GENERATE CALENDAR BUTTON SHOULD BE VISIBLE OR NOT
	const headerContent = !allMatches[0] ? (
		<Button isAct={true} onClick={generateCalendarHandler}>
			Generate calendar
		</Button>
	) : (
		''
	);
	return (
		<div className='flex flex-wrap justify-center p-10 items-start gap-12 bg-slate-200 min-h-screen'>
			{headerContent}
			{allMatches[0] && (
				<div className='flex gap-12 w-full'>
					<div className='flex flex-col gap-4 w-3/5'>
						<div className='flex justify-between w-full'>
							<Button isAct={curDay > 0} onClick={prevDayHandler}>
								Previous
							</Button>
							<Button isAct={curDay < 37} onClick={nextDayHandler}>
								Next
							</Button>
						</div>
						<AllDayMatches
							dayMatches={allMatches[curDay]}
							curDay={curDay}
							nextToBeSim={goalsScored.length - curDay === 0}
							teams={teamsCollection}
							onUpdate={updateStatsHandler}
							onSimulate={simulateHandler}
							goalsScored={goalsScored[curDay]}
							onPrevDay={prevDayHandler}
							onNextDay={nextDayHandler}
						/>
					</div>
					<Table teams={teamsTab} />
				</div>
			)}
		</div>
	);
}

export default App;
export type { UpdateStats };
