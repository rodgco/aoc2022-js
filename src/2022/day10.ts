import { default as CPU, type Instruction, type Spec } from '../lib/cpu';
import { generate } from 'text-to-image';
import Tesseract from 'tesseract.js';

const specs: Array<Spec> = [
	{
		mnemonic: 'noop',
		parameters: 0,
		cycles: 1,
		implementation: (state) => state
	},
	{
		mnemonic: 'addx',
		parameters: 1,
		cycles: 2,
		implementation: (state, parameters) => {
			state['X'] += parameters[0];
			return state;
		}
	}
];

const cpu = new CPU({ X: 1 }, specs);

function parseInput(input: Array<string>): Array<Instruction> {
	const program: Array<Instruction> = [];
	for (const line of input) {
		const [mnemonic, parameters] = line.split(' ');
		program.push({
			mnemonic,
			parameters: parameters?.split(',').map(Number) || []
		});
	}
	return program;
}

function part1(input: Array<string>) {
	const program = parseInput(input);
	if (!cpu.load(program)) throw 'Invalid program';
	cpu.run();

	let result = 0;
	for (let i = 20; i <= 220; i += 40) {
		// i-1 --> The beggining of the cycle is the final state of the previous cycle
		result += i * cpu.cycles[i - 1]['X'];
	}
	return result;
}

async function part2(_input: Array<string>) {
	const display: Array<string> = Array.from({ length: 6 }, () => '');
	for (let line = 0; line < 6; line++) {
		for (let pointer = 0; pointer < 40; pointer++) {
			const sprite = cpu.cycles[line * 40 + pointer]['X'];
			if (pointer >= sprite - 1 && pointer <= sprite + 1) {
				display[line] = display[line].concat('#');
			} else {
				display[line] = display[line].concat('.');
			}
		}
	}
	const crt = display.reduce(
		(a, l) =>
			a.concat(l.replaceAll('#', '\u2588').replaceAll('.', '\xa0'), '\n'),
		'\n'
	);
	console.log(crt);

	// @ts-ignore
	const dataURI = await generate(crt, {
		fontFamily: 'monospace',
		fontSize: 8,
		lineHeight: 8
	});
	console.log(dataURI);
	const { data } = await Tesseract.recognize(dataURI);
	console.log(data.text);
	return data.text;
}

export { part1, part2 };
