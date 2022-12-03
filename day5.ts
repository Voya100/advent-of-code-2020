// https://adventofcode.com/2020/day/5
import * as fs from 'fs';

const input = fs.readFileSync('inputs/day5.txt', 'utf8');

const boardingPassIds = input.replace(/F/g, '0').replace(/B/g, '1')
  .replace(/L/g, '0')
  .replace(/R/g, '1')
  .split('\n')
  .map(getRowId)

function part1() {
  return Math.max(...boardingPassIds);
}

function part2() {
  boardingPassIds.sort((a, b) => a - b);
  for (let i = 1; i < boardingPassIds.length; i++) {
    // Check for gap
    if (boardingPassIds[i] - boardingPassIds[i - 1] === 2) {
      return boardingPassIds[i] - 1;
    }
  }
}

function getRowId(text: string) {
  const row = toNumberFromBinary(text.slice(0, 7));
  const column = toNumberFromBinary(text.slice(7, 10));
  return row * 8 + column;
}

function toNumberFromBinary(binary: string) {
  return parseInt(binary, 2);
}

console.log('Part 1', part1());
console.log('Part 2', part2());
