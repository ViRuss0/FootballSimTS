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

export default function Button(props: ButtonProps): JSX.Element {
	return (
		<button
			className={`rounded-xl p-4 from-slate-900 to-slate-700 bg-gradient-to-r text-slate-100 hover:from-slate-600 hover:to-slate-600 hover:bg-gradient-to-r transform hover:shadow-xl ${
				props.isAct || 'invisible'
			}`}
			{...props}
		>
			{props.children}
		</button>
	);
}

export type { ButtonProps };
