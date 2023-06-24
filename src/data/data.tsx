const teams: string[] = [
	'atalanta',
	'bologna',
	'cagliari',
	'empoli',
	'fiorentina',
	'frosinone',
	'genoa',
	'verona',
	'inter',
	'juventus',
	'lecce',
	'lazio',
	'milan',
	'monza',
	'napoli',
	'roma',
	'salernitana',
	'sassuolo',
	'torino',
	'udinese',
];

//DEFINING TEAM CLASS
class Team {
	name: string;
	playedHome: number;
	atk: number;
	build: number;
	def: number;
	points: number;
	scored: number;
	conceded: number;
	played: number;

	constructor(name: string, atk: number, build: number, def: number) {
		this.name = name;
		this.playedHome = 0;
		this.atk = atk;
		this.build = build;
		this.def = def;
		this.points = 0;
		this.scored = 0;
		this.conceded = 0;
		this.played = 0;
	}

	capitalize = function (this: Team): string {
		return (
			this.name[0].toUpperCase() +
			this.name
				.split('')
				.splice(1, this.name.length - 1)
				.join('')
		);
	};

	goalDifference = function (this: Team): number {
		return this.scored - this.conceded;
	};
}

const teamsCollection: { [key: string]: Team } = {};

// teams.forEach((team) => (teamsCollection[team] = new Team(team)));
teamsCollection.atalanta = new Team('atalanta', 75, 78, 68);
teamsCollection.bologna = new Team('bologna', 66, 68, 63);
teamsCollection.cagliari = new Team('cagliari', 50, 50, 60);
teamsCollection.empoli = new Team('empoli', 53, 63, 69);
teamsCollection.fiorentina = new Team('fiorentina', 70, 79, 66);
teamsCollection.frosinone = new Team('frosinone', 58, 58, 56);
teamsCollection.genoa = new Team('genoa', 54, 57, 56);
teamsCollection.verona = new Team('verona', 53, 56, 60);
teamsCollection.inter = new Team('inter', 86, 85, 84);
teamsCollection.juventus = new Team('juventus', 82, 79, 85);
teamsCollection.lecce = new Team('lecce', 54, 63, 65);
teamsCollection.lazio = new Team('lazio', 79, 82, 82);
teamsCollection.milan = new Team('milan', 83, 83, 79);
teamsCollection.monza = new Team('monza', 65, 76, 68);
teamsCollection.napoli = new Team('napoli', 85, 90, 82);
teamsCollection.roma = new Team('roma', 79, 75, 81);
teamsCollection.salernitana = new Team('salernitana', 60, 66, 60);
teamsCollection.torino = new Team('torino', 67, 69, 72);
teamsCollection.sassuolo = new Team('sassuolo', 69, 74, 63);
teamsCollection.udinese = new Team('udinese', 67, 64, 72);

export { teamsCollection, teams };
export type { Team };
