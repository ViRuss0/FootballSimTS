import { Fragment } from 'react';
import type { Team } from '../data/data';

type Props = {
	teams: { [key: string]: Team };
};

const Table = ({ teams }: Props) => (
	<div className='grid grid-cols-6 p-4 gap-2 shadow-md rounded flex-col items-start justify-start w-96 text-xl whitespace-nowrap from-slate-900 to-slate-700 bg-gradient-to-r text-slate-100 text-center'>
		<>
			<div className='col-start-1 col-span-2 text-left'>Team</div>
			<div>Pts</div>
			<div>GS</div>
			<div>GC</div>
			<div>GD</div>
		</>

		{/* SORTING TEAMS BASED ON POINTS */}
		{Object.keys(teams)
			.map((k, i: number) => teams[k])
			.sort((a, b) => {
				if (b.points === a.points) {
					if (b.goalDifference === a.goalDifference) return b.scored - a.scored;
					return b.goalDifference - a.goalDifference;
				}
				return b.points - a.points;
			})
			.map((team, i) => (
				<Fragment key={i}>
					<div className=' col-start-1 col-span-2 text-left'>
						{team.capitalize()}
					</div>
					<div>{team.points}</div>
					<div>{team.scored}</div>
					<div>{team.conceded}</div>
					<div>{team.goalDifference}</div>
				</Fragment>
			))}
	</div>
);

export default Table;
