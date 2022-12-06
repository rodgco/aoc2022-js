const values: Record<string, number> = {
	A: 0,
	B: 1,
	C: 2,
	X: 0,
	Y: 1,
	Z: 2
};

function parseInput(input: Array<string>): Array<Array<number>> {
	return input.map((v) => v.split(' ').map((v) => values[v]));
}

/**
 * Using a calculation approach to solve the problem...
 *
 *        X   Y   Z
 *        0   1   2
 *      +---+---+---+
 *  A 0 | 1 | 2 | 0 |
 *      +---+---+---+
 *  B 1 | 0 | 1 | 2 |
 *      +---+---+---+
 *  C 2 | 2 | 0 | 1 |
 *      +---+---+---+
 *
 */

function round(player1: number, player2: number): number {
	return 3 * (2 - ((4 + player1 - player2) % 3)) + player2 + 1;
}

/**
 * Using a calculation approach to solve the problem...
 *
 *        X   Y   Z
 *        0   1   2
 *      +---+---+---+
 *  A 0 | 2 | 0 | 1 |
 *      +---+---+---+
 *  B 1 | 0 | 1 | 2 |
 *      +---+---+---+
 *  C 2 | 1 | 2 | 0 |
 *      +---+---+---+
 *
 */
function find(player1: number, result: number): number {
	return 3 * result + ((2 + player1 + result) % 3) + 1;
}

function part1(input: Array<string>): number {
	const matches: Array<Array<number>> = parseInput(input);
	let result = 0;
	for (const match of matches) {
		result += round(match[0], match[1]);
	}
	return result;
}

function part2(input: Array<string>): number {
	const matches: Array<Array<number>> = parseInput(input);
	let result = 0;
	for (const match of matches) {
		result += find(match[0], match[1]);
	}
	return result;
}

export { part1, part2 };
