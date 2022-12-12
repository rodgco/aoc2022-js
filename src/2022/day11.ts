import lcm from 'compute-lcm';

const TEST = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`.split('\n');

class Monkey {
	static monkeys: Array<Monkey> = [];
	static reliefEnabled = true;
	static lcm: number;

	name: string;
	items: Array<number>;
	operation: (old: number) => number;
	test: number;
	action: [number, number];
	inspected: number;

	constructor(
		name: string,
		initialItems: Array<number>,
		operation: (old: number) => number,
		test: number,
		action: [number, number]
	) {
		this.name = name;
		this.items = initialItems;
		this.operation = operation;
		this.test = test;
		this.action = action;
		this.inspected = 0;

		Monkey.monkeys.push(this);
	}

	play() {
		while (this.items.length) {
			let item = this.items.shift();
			this.inspected += 1;
			let worryLevel = this.operation(item || 0);
			if (Monkey.reliefEnabled) {
				worryLevel = Math.floor(worryLevel / 3);
			} else {
				if (worryLevel > Monkey.lcm) {
					worryLevel %= Monkey.lcm;
				}
			}
			const action =
				worryLevel % this.test === 0 ? this.action[0] : this.action[1];
			Monkey.monkeys[action].items.push(worryLevel);
		}
	}

	static reset() {
		Monkey.monkeys.length = 0;
	}

	static play(rounds: number) {
		Monkey.lcm = lcm(Monkey.monkeys.map((m) => m.test)) || 1;
		for (let round = 0; round < rounds; round++) {
			for (const monkey of Monkey.monkeys) {
				monkey.play();
			}
		}
	}

	static calcMonkeyBusiness() {
		const inspected = Monkey.monkeys
			.map((m) => m.inspected)
			.sort((a, b) => b - a);
		return inspected[0] * inspected[1];
	}
}

function parseInput(input: Array<string>) {
	for (let i = 0; i < input.length; i += 7) {
		const name = input[i + 0].slice(0, -1);
		const initialItems = input[i + 1].slice(18).split(', ').map(Number);
		const operation = (old: number) =>
			eval(input[i + 2].slice(19).replace('old', old.toString()));
		const test = parseInt(input[i + 3].slice(21));
		const action: [number, number] = [
			parseInt(input[i + 4].slice(29)),
			parseInt(input[i + 5].slice(30))
		];
		new Monkey(name, initialItems, operation, test, action);
	}
}

function part1(input: Array<string>, rounds = 20) {
	parseInput(input);
	Monkey.play(20);
	return Monkey.calcMonkeyBusiness();
}

function part2(input: Array<string>) {
	Monkey.reset();
	parseInput(input);
	Monkey.reliefEnabled = false;
	Monkey.play(10_000);
	return Monkey.calcMonkeyBusiness();
}

export { part1, part2 };
