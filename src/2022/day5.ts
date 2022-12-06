interface Warehouse {
	stacks: Record<string, Array<string>>;
	moves: Array<Move>;
}

interface Move {
	qty: number;
	from: string;
	to: string;
}

function parseInput(input: Array<string>): Warehouse {
	const warehouse: Warehouse = {
		stacks: {},
		moves: []
	};

	// Find stack id row
	let stackIdRow = 0;
	const stackIdRowRX = /^[\s\d\s\s?]+$/gm;
	while (!input[stackIdRow].match(stackIdRowRX)) stackIdRow++;

	// Extract stackIds
	const stackIdRX = /\d/gm;
	for (const stackId of input[stackIdRow].match(stackIdRX) || []) {
		warehouse.stacks[stackId] = [];
	}

	// Initial load of crates to stacks
	for (let i = 0; i < stackIdRow; i++) {
		Object.values(warehouse.stacks).forEach((s, n) => {
			const crate = input[i][4 * n + 1];
			if (crate !== ' ') s.unshift(crate);
		});
	}

	const moveRX = /move\s(?<qty>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/;
	for (let i = stackIdRow + 2; i < input.length; i++) {
		const { qty, from, to } = <Move>(input[i].match(moveRX)?.groups as unknown);
		warehouse.moves.push({ qty: parseInt(<string>(<unknown>qty)), from, to });
	}
	return warehouse;
}

function getTopCrate(stacks: Record<string, Array<string>>) {
	let result = '';
	for (const stack of Object.keys(stacks)) {
		result += <string>stacks[stack].pop();
	}
	return result;
}

function part1(input: Array<string>) {
	const { stacks, moves } = parseInput(input);
	for (const move of moves) {
		for (let i = 0; i < move.qty; i++) {
			stacks[move.to].push(<string>stacks[move.from].pop());
		}
	}
	return getTopCrate(stacks);
}

function part2(input: Array<string>) {
	const { stacks, moves } = parseInput(input);
	console.log(stacks);
	for (const move of moves) {
		const crates = <Array<string>>stacks[move.from].splice(-1 * move.qty);
		stacks[move.to].push(...crates);
	}
	return getTopCrate(stacks);
}

export { part1, part2 };
