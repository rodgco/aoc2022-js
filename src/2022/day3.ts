function parseInput(input: Array<string>) {
	return input.map((v) => [v.slice(0, v.length / 2), v.slice(v.length / 2)]);
}

function priority(item: string) {
	if (item >= 'a' && item <= 'z') return item.charCodeAt(0) - 96;
	return item.charCodeAt(0) - 38;
}

function part1(input: Array<string>) {
	const rucksacks = parseInput(input);
	let sumOfPriorities = 0;
	for (const rucksack of rucksacks) {
		const [compartment1, compartment2] = rucksack;
		for (const item of compartment1) {
			if (compartment2.includes(item)) {
				sumOfPriorities += priority(item);
				break;
			}
		}
	}
	return sumOfPriorities;
}

function part2(input: Array<string>) {
	let sumOfPriorities = 0;
	for (let i = 0; i < input.length; i += 3) {
		for (const item of input[0 + i]) {
			if (input[1 + i].includes(item) && input[2 + i].includes(item)) {
				sumOfPriorities += priority(item);
				break;
			}
		}
	}
	return sumOfPriorities;
}

export { part1, part2 };
