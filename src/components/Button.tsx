type ButtonProps = {
	isAct: boolean;
	prevDayHandler?: () => void;
	nextDayHandler?: () => void;
	onClick?: () => void;
	children?: React.ReactNode;
	style?: {
		paddingLeft: number;
		paddingRight: number;
	};
};

const Button = (props: ButtonProps): JSX.Element => (
	<button
		className={`rounded-xl p-4 from-slate-900 to-slate-700 bg-gradient-to-r text-slate-100 hover:from-slate-600 hover:to-slate-600 hover:bg-gradient-to-r transform hover:shadow-xl ${
			props.isAct || 'invisible'
		}`}
		{...props}
	>
		{props.children}
	</button>
);

export default Button;
export type { ButtonProps };
