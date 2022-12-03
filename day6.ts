// https://adventofcode.com/2020/day/6
import * as fs from 'fs';
import { sum } from './utils';

const input = fs.readFileSync('inputs/day6.txt', 'utf8');

const groupInputs = input.split('\n\n');

function part1() {
  const groupCounts = groupInputs.map(
    (groupInput) => new Set(groupInput.replace(/\n/g, '').split('')).size
  );
  return sum(groupCounts, (val) => val);
}

function part2() {
  const groupCounts = groupInputs.map(getAllYesAnswerCount);
  return sum(groupCounts, (val) => val);
}

function getAllYesAnswerCount(groupInput: string) {
  const answerRows = groupInput.split('\n').map(row => row.split(''));
  const allYes = new Set(answerRows[0]);
  for (let row of answerRows) {
    for (let yes of allYes) {
      if (!row.includes(yes)) {
        allYes.delete(yes);
      }
    }
  }
  return allYes.size;
}

console.log('Part 1', part1());
console.log('Part 2', part2());
