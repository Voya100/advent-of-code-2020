// https://adventofcode.com/2020/day/3
import * as fs from 'fs';

const input = fs.readFileSync('inputs/day3.txt', 'utf8');
const rows = input.split('\n');

function part1() {
  return countTreesWithSlope(3, 1);
}

function part2() {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return slopes
    .map(([right, down]) => countTreesWithSlope(right, down))
    .reduce((treesForSlope, total) => treesForSlope * total, 1);
}

function countTreesWithSlope(right: number, down: number) {
  let index = 0;
  let trees = 0;
  for (let j = 0; j < rows.length; j += down) {
    const row = rows[j];
    if (isTree(row, index)) {
      trees++;
    }
    index += right;
  }
  return trees;
}

function isTree(row: string, index: number) {
  return row[index % row.length] === '#';
}

console.log('Part 1', part1());
console.log('Part 2', part2());
