interface File {
	name: string;
	size: number;
}

class Directory {
	name: string;
	parent: Directory | null;
	size: number;
	files: Array<File>;
	dirs: Array<Directory>;

	constructor(name: string, parent: Directory | null) {
		this.name = name;
		this.parent = parent;
		this.size = 0;
		this.files = [];
		this.dirs = [];
	}

	addFile(name: string, size: number) {
		this.files.push({ name, size });
		this.incrementSizeFromSubDir(size);
	}

	incrementSizeFromSubDir(size: number) {
		this.size += size;
		if (this.parent) this.parent.incrementSizeFromSubDir(size);
	}

	addDir(name: string) {
		this.dirs.push(new Directory(name, this));
	}

	reduceSize<T>(callback: (acc: T, size: number) => T, initial: T): T {
		let acc = callback(initial, this.size);
		this.dirs.forEach((dir) => {
			acc = dir.reduceSize(callback, acc);
		});
		return acc;
	}
}

interface CMD {
	cmd: 'cd' | 'ls';
	name?: string;
}

function parseInput(input: Array<string>) {
	let currDir: Directory = fileSystem;
	for (let i = 0; i < input.length; i++) {
		const command = input[i].match(matchCmd)?.groups;
		const { cmd, name } = <CMD>(<unknown>command);
		switch (cmd) {
			case 'cd':
				if (name !== '/') {
					if (name === '..') {
						currDir = currDir.parent || fileSystem;
					} else {
						const newDir = currDir.dirs.find((d) => d.name === name);
						if (newDir) currDir = newDir;
					}
				}
				break;
			case 'ls':
				i += 1;
				while (i < input.length && !input[i].match(matchCmd)) {
					const entry = input[i].match(matchEntry)?.groups || {};
					if (entry.dir) {
						currDir.addDir(entry.dir);
					} else if (entry.file) {
						currDir.addFile(entry.file, parseInt(entry.size));
					}
					i += 1;
				}
				i -= 1;
				break;
		}
	}
}

const fileSystem: Directory = new Directory('/', null);

const matchCmd = /^\$\s(?<cmd>cd|ls)\s?(?<name>\/|[a-z\.]*)$/;
const matchEntry = /^dir\s(?<dir>[a-z]+)$|^(?<size>\d+)\s(?<file>[a-z\.]+)$/;

const TOTAL = 70_000_000;
const REQUIRED = 30_000_000;

function part1(input: Array<string>) {
	parseInput(input);
	const sizes = fileSystem.reduceSize<Array<number>>((acc, size) => {
		return size > 0 && size <= 100000 ? [...acc, size] : acc;
	}, []);
	return sizes.reduce((a, v) => a + v, 0);
}

function part2(input: Array<string>): number {
	const needed = REQUIRED - (TOTAL - fileSystem.size);

	const size = fileSystem.reduceSize<number>((acc, size) => {
		return size >= needed && size <= acc ? size : acc;
	}, Infinity);
	return size;
}

export { part1, part2 };
