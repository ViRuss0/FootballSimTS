import type { ButtonProps } from './Button';

const NavButton = (props: ButtonProps): JSX.Element => (
	<button
		className={`rounded-full bg-slate-100 text-slate-700 py-2 px-2 hover:bg-slate-300 transition uppercase mt-4 ${
			props.isAct || 'invisible'
		}`}
		{...props}
	>
		{props.children}
	</button>
);

export default NavButton;
