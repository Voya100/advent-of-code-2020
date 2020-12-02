// https://adventofcode.com/2020/day/2
import * as fs from "fs";

const input = fs.readFileSync("inputs/day2.txt", "utf8");
const rows = input.split("\n");

function part1() {
  return rows.filter(isValid).length;
}
function part2() {
  return rows.filter(isValid2).length;
}

function isValid(row: string) {
  const [rule, password] = row.split(': ');
  const [range, symbol] = rule.split(' ');
  const [min, max] = range.split('-').map(val => +val);
  const count = password.split('').filter(char => char === symbol).length;
  return min <= count && count <= max;
}
function isValid2(row: string) {
  const [rule, password] = row.split(': ');
  const [indices, symbol] = rule.split(' ');
  const [index1, index2] = indices.split('-').map(val => +val - 1);
  return (password[index1] === symbol || password[index2] === symbol) && password[index1] !== password[index2];
}

console.log('Part 1:', part1());
console.log('Part 2:', part2());

