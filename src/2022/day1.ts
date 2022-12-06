function parseInput(input: Array<string>): Array<number> {
	const calories: Array<number> = [0];
	for (const calorie of input) {
		if (calorie.length === 0) calories.push(0);
		else calories[calories.length - 1] += parseInt(calorie);
	}
	return calories;
}

function part1(input: Array<string>): number {
	const calories = parseInput(input);
	return Math.max.apply(null, calories);
}

function part2(input: Array<string>): number {
	const calories = parseInput(input).sort();
	return calories.slice(-3).reduce((a, v) => a + v);
}

export { part1, part2 };
