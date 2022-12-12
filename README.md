# Advent of Code 2022 - Typescript

Let's save Christmas again!!!

[Advent of Code](http://adventofcode.com/2022) is a great opportunity to exercise my developer skills. This year trying to use Typescript to save Christmas.

## Tools

To help me I'm using the following tools:

* [Prettier](http://prettier.io) - An opinionated code formatter
* [@aocjs/cli](https://aocjs.github.io/) - Advent of Code command line tool. Supports JavaScript and TypeScript
* [PNPM](http://pnpm.io) - Fast, disk space efficient package manager

### Day 9

I've gotta mention that on Day9 I used [ChatGPT](https://chat.openai.com/chat) to help me with the code and I was (still am) surprised with the quality of the code it generated.

As an example I asked it to: "using typescript create a move function, that receives two parameters: the first is a coordinate object with variables x and y, both numbers; the second is a movement object with two variables direction, that can be U for up, R for right, and so it goes; and a second the number of steps. Depending on the direction the coordinate will increase or decrease the number of steps."

And it generated the following code, with comments, and types!!!

``` typescript
type Coordinate = {
  x: number;
  y: number;
};

type Movement = {
  direction: 'U' | 'R' | 'D' | 'L'; // U: up, R: right, D: down, L: left
  steps: number;
};

function move(coordinate: Coordinate, movement: Movement): Coordinate {
  const { x, y } = coordinate;
  const { direction, steps } = movement;

  // update the coordinate based on the movement direction and steps
  switch (direction) {
    case 'U':
      return { x: x, y: y - steps };
    case 'R':
      return { x: x + steps, y: y };
    case 'D':
      return { x: x, y: y + steps };
    case 'L':
      return { x: x - steps, y: y };
    default:
      throw new Error('Invalid movement direction');
  }
}
```

With purely textual requests I turned this function into a Coordinate class, implemented a `follow` method, that only required a few tweaks on the diagonal movement, and voi lá! You'll find the code at `/lib/coordinate.ts`.

### Day 10

Day 10 gave me the ooportunity to come up with a solution to try to read the ASCII art generated at the end of Part Two.

Used [text-to-image](https://www.npmjs.com/package/text-to-image) to convert it to an image, and then used [Tesseract](https://tesseract.projectnaptha.com/) to read the characters. After a few struggles with text-to-image collapsing adjacent spaces (solved with the use of non-breaking spaces "\xa0"), the best char for the fill ("\u2588") and tweaking on font size and weight and line height, got pretty close. Tesseract keeps reading the K as an R, unlucky me to got this! Lucky me that I could experience with differente technology.

## Installation

* Clone the repository
* `pnpm i`
* Configure @aocjs/cli as described at their [site](https://aocjs.github.io)
* `pnpm start dayN` - Where N is the day you're solving

> Happy Coding!!!
