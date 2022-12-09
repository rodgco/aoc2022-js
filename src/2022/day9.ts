import { default as Coordinate, type Movement } from '../lib/coordinate';

function parseInput(input: Array<string>): Array<Movement> {
	// parse de input breaking into an array of Movements
	return input.map((m) => {
		const values = m.split(' ');
		return <Movement>{ direction: values[0], steps: parseInt(values[1]) };
	});
}

function part1(input: Array<string>): number {
	const movements = parseInput(input);
	const tailPositions: Set<string> = new Set();

	const head = new Coordinate(0, 0);
	const tail = new Coordinate(0, 0);

	tailPositions.add(tail.toString());
	for (const movement of movements) {
		const { direction, steps } = movement;
		for (let i = 0; i < steps; i++) {
			head.move({ direction, steps: 1 });
			tail.follow(head);
			tailPositions.add(tail.toString());
		}
	}
	return tailPositions.size;
}

function part2(input: Array<string>): number {
	const movements = parseInput(input);
	const tailPositions: Set<string> = new Set();

	const rope = Array.from({ length: 10 }, () => new Coordinate(0, 0));
	const head = rope[0];
	const tail = rope[rope.length - 1];

	tailPositions.add(tail.toString());
	for (const movement of movements) {
		const { direction, steps } = movement;
		for (let i = 0; i < steps; i++) {
			head.move({ direction, steps: 1 });
			for (let n = 1; n < rope.length; n++) {
				rope[n].follow(rope[n - 1]);
			}
			tailPositions.add(tail.toString());
		}
	}
	return tailPositions.size;
}

export { part1, part2 };
