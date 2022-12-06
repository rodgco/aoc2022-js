function parseInput(input: Array<string>) {
	return input.map((v) => v.split(',').map((v) => v.split('-').map(Number)));
}

function part1(input: Array<string>) {
	const pairs = parseInput(input);
	let overlap = 0;
	for (const pair of pairs) {
		const [elf1, elf2] = pair;
		if (
			(elf1[0] >= elf2[0] && elf1[1] <= elf2[1]) ||
			(elf2[0] >= elf1[0] && elf2[1] <= elf1[1])
		) {
			overlap += 1;
		}
	}
	return overlap;
}

function part2(input: Array<string>) {
	const pairs = parseInput(input);
	let overlap = 0;
	for (const pair of pairs) {
		const [elf1, elf2] = pair;
		if (
			(elf1[0] <= elf2[0] && elf1[1] >= elf2[0]) ||
			(elf2[0] <= elf1[0] && elf2[1] >= elf1[0])
		) {
			overlap += 1;
		}
	}
	return overlap;
}

export { part1, part2 };
