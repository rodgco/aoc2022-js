type Movement = {
	direction: 'U' | 'R' | 'D' | 'L'; // U: up, R: right, D: down, L: left
	steps: number;
};

class Coordinate {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	move(movement: Movement) {
		const { direction, steps } = movement;

		// update the x and y properties based on the movement direction and steps
		switch (direction) {
			case 'U':
				this.y -= steps;
				break;
			case 'R':
				this.x += steps;
				break;
			case 'D':
				this.y += steps;
				break;
			case 'L':
				this.x -= steps;
				break;
			default:
				throw new Error('Invalid movement direction');
		}
	}

	isNeighborOf(target: Coordinate): boolean {
		// calculate the differences in x and y between the current and target coordinates
		const dx = target.x - this.x;
		const dy = target.y - this.y;

		return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
	}

	follow(target: Coordinate) {
		// calculate the differences in x and y between the current and target coordinates
		const dx = target.x - this.x;
		const dy = target.y - this.y;

		// check if the current coordinate is already at the same position or a neighboring position to the target
		if (this.isNeighborOf(target)) {
			return;
		}

		// move the current coordinate to the closest neighboring position to the target
		// move the current coordinate in the x direction
		if (dx > 0) {
			// move right
			this.move({ direction: 'R', steps: 1 });
		} else if (dx < 0) {
			// move left
			this.move({ direction: 'L', steps: 1 });
		}
		// move the current coordinate in the y direction
		if (dy > 0) {
			// move down
			this.move({ direction: 'D', steps: 1 });
		} else if (dy < 0) {
			// move up
			this.move({ direction: 'U', steps: 1 });
		}
	}

	toString(): string {
		return JSON.stringify(this);
	}
}

export default Coordinate;
export type { Movement };
