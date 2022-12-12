export interface Spec {
	mnemonic: string;
	parameters: number;
	cycles: number;
	implementation: (
		state: Record<string, number>,
		parameters: Array<number>
	) => Record<string, number>;
}

export interface Instruction {
	mnemonic: string;
	parameters: Array<number>;
}

export default class CPU {
	initialState: Record<string, number>;
	specs: Array<Spec>;
	program: Array<Instruction>;
	cycles: Array<Record<string, number>>;

	constructor(
		initialState: Record<string, number>,
		specs: Array<Spec> = [],
		program: Array<Instruction> = []
	) {
		this.initialState = initialState;
		this.specs = specs;
		this.program = [];
		this.cycles = [];

		this.load(program);
	}

	reset() {
		this.cycles = [this.initialState];
	}

	load(program: Array<Instruction>): boolean {
		if (!this.parse(program)) return false;
		this.program = program;
		this.reset();
		return true;
	}

	parse(program: Array<Instruction>): boolean {
		for (const instruction of program) {
			const spec = this.specs.find(
				(spec) => instruction.mnemonic === spec.mnemonic
			);
			if (!spec) return false;
			if (spec.parameters != instruction.parameters.length) return false;
		}
		return true;
	}

	run() {
		this.reset();
		let state = this.initialState;
		for (const instruction of this.program) {
			const spec = this.specs.find(
				(spec) => instruction.mnemonic === spec.mnemonic
			);
			if (spec == null) throw 'Error: invalid command';
			for (let i = 0; i < spec.cycles; i++) {
				if (i + 1 === spec.cycles) {
					state = { ...spec.implementation(state, instruction.parameters) };
				}
				this.cycles.push({ ...state });
			}
		}
	}
}
