/**
 * North: closer to first line
 * West: closer to last column
 * South: closer to last line
 * West: closer to first column
 */
interface Neighbourghood<T> {
	N: T | null;
	NE: T | null;
	E: T | null;
	SE: T | null;
	S: T | null;
	SW: T | null;
	W: T | null;
	NW: T | null;
}

type Directions = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

type Coordinate = {
	row: number;
	col: number;
};

class Map<T> {
	map: Array<Array<T>>;
	width: number;
	length: number;

	constructor(input: Array<string>, cb: (value: string) => T = (v) => <T>v) {
		this.map = input.map((line) => line.split('').map(cb));
		this.width = this.map[0].length;
		this.length = this.map.length;
	}

	reduce<X>(
		callback: (acc: X, value: T, coord: Coordinate) => X,
		initial: X
	): X {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.length; y++) {
				initial = callback(initial, this.map[y][x], { row: y, col: x });
			}
		}
		return initial;
	}

	getNeighbours(
		coord: Coordinate,
		neighbours: string | Array<Directions> = ['N', 'E', 'S', 'W']
	): Partial<Neighbourghood<T>> {
		const { row, col } = coord;
		const result: Partial<Neighbourghood<T>> = {};

		if (typeof neighbours === 'string')
			neighbours = <Array<Directions>>[neighbours];

		if (neighbours.includes('N'))
			result.N = row > 0 ? this.map[row - 1][col] : null;
		if (neighbours.includes('NE'))
			result.NE =
				row > 0 && col < this.width - 1 ? this.map[row - 1][col + 1] : null;
		if (neighbours.includes('E'))
			result.E = col < this.width - 1 ? this.map[row][col + 1] : null;
		if (neighbours.includes('SE'))
			result.SE =
				col < this.width - 1 && row < this.length - 1
					? this.map[row + 1][col + 1]
					: null;
		if (neighbours.includes('S'))
			result.S = row < this.length - 1 ? this.map[row + 1][col] : null;
		if (neighbours.includes('SW'))
			result.SW =
				row < this.length - 1 && col > 0 ? this.map[row + 1][col - 1] : null;
		if (neighbours.includes('W'))
			result.W = col > 0 ? this.map[row][col - 1] : null;
		if (neighbours.includes('NW'))
			result.NW = col > 0 && row > 0 ? this.map[row - 1][col - 1] : null;

		return result;
	}

	getNewCoordinates(
		coord: Coordinate,
		steps: number,
		direction: string | Directions
	): { col: number; row: number } {
		let { row, col } = coord;

		if (direction.includes('N')) row -= steps;
		if (direction.includes('E')) col += steps;
		if (direction.includes('S')) row += steps;
		if (direction.includes('W')) col -= steps;

		if (row < 0) row = 0;
		if (row >= this.length) row = this.length - 1;
		if (col < 0) col = 0;
		if (col >= this.width) col = this.width - 1;

		return { col, row };
	}

	countStepsUntil(
		coord: Coordinate,
		direction: string | Directions,
		callback: (v: T) => boolean
	): number {
		let { row, col } = coord;
		let count = 0;

		while (
			row !== 0 &&
			row !== this.length - 1 &&
			col !== 0 &&
			col !== this.width - 1
		) {
			count += 1;
			({ row, col } = this.getNewCoordinates({ row, col }, 1, direction));
			if (callback(this.map[row][col])) break;
		}

		return count;
	}

	getLineToBorder(coord: Coordinate, direction: string | Directions): Array<T> {
		let { row, col } = coord;
		const result: Array<T> = [];

		let value: T | null | undefined = this.getNeighbours(
			{ col, row },
			direction
		)[<Directions>direction];

		while (value != null) {
			result.push(value);
			({ col, row } = this.getNewCoordinates({ col, row }, 1, direction));
			value = this.getNeighbours({ col, row }, direction)[
				<Directions>direction
			];
		}

		return result;
	}
}

export default Map;
