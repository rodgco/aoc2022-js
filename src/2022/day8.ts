import Map from '../lib/map';

const directions = ['N', 'E', 'S', 'W'];

function isVisible(height: number, line: Array<number>): boolean {
	return line.reduce(
		(isVisible, neightbourHeight) => isVisible && height > neightbourHeight,
		true
	);
}

function part1(input: Array<string>): number {
	const map = new Map(input, Number);
	let visibleCount = 0;

	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map.width; col++) {
			visibleCount += directions.reduce(
				(acc, direction) =>
					acc ||
					isVisible(
						map.map[row][col],
						map.getLineToBorder({ row, col }, direction)
					),
				false
			)
				? 1
				: 0;
		}
	}
	return visibleCount;
}

function part2(input: Array<string>): number {
	const map = new Map(input, Number);
	let highestScenicCore = 0;

	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map.width; col++) {
			const scenicScore = directions.reduce(
				(ss, direction) =>
					ss *
					map.countStepsUntil(
						{ row, col },
						direction,
						(height) => height >= map.map[row][col]
					),
				1
			);
			if (scenicScore > highestScenicCore) highestScenicCore = scenicScore;
		}
	}

	return highestScenicCore;
}

export { part1, part2 };
