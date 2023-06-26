import type { Team } from '../data/data';
type SingleMatchProps = {
	match: Team[];
	teams: { [key: string]: Team };
	dayResults: number[];
};

const SingleMatch = ({
	match,
	teams,
	dayResults,
}: SingleMatchProps): JSX.Element => (
	<div className='flex justify-between w-full py-1 px-3'>
		<span className='w-1/3 text-center'>
			{teams[match[0]?.name].capitalize()}
		</span>
		{dayResults?.length > 0 ? (
			<span className='w-1/3 text-center'>
				{dayResults[0]} - {dayResults[1]}
			</span>
		) : (
			''
		)}
		<span className='w-1/3 text-center'>
			{teams[match[1].name].capitalize()}
		</span>
	</div>
);

export default SingleMatch;
