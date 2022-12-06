function parseInput(input: Array<string>): string {
	return input[0];
}

function isMessageHeaderMarker(chars: string, length = 4): boolean {
	return [...new Set(chars.split(''))].length === length;
}

function findMessageStart(datastream: string, length = 4): number {
	for (let i = 0; i < datastream.length + length - 1; i++) {
		const chars = datastream.slice(i, i + length);
		if (isMessageHeaderMarker(chars, length)) return i + length;
	}
	return 0;
}

function part1(input: Array<string>): number {
	const datastream = parseInput(input);
	return findMessageStart(datastream, 4);
}

function part2(input: Array<string>): number {
	const datastream = parseInput(input);
	return findMessageStart(datastream, 14);
}

export { part1, part2 };
