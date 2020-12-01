// https://adventofcode.com/2020/day/1
import * as fs from "fs";

const input = fs.readFileSync("inputs/day1.txt", "utf8");
const numbers = input.split("\n").map(str => +str);
const numbersSet = new Set(input.split("\n").map(str => +str));

function part1() {
  const sum = 2020;
  for (let number of numbersSet) {
    const requiredNumber = sum - number;
    if (numbersSet.has(requiredNumber)) {
      // console.log(number, requiredNumber);
      return number * requiredNumber;
    }
  }
}

function part2() {
  const sum = 2020;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const requiredNumber = sum - numbers[i] - numbers[j];
      if (numbersSet.has(requiredNumber)) {
        // console.log(numbers[i], numbers[j], requiredNumber);
        return numbers[i] * numbers[j] * requiredNumber;
      }
    }
  }
  // return masses.reduce((sum, mass) => sum + getTotalFuel(mass), 0);
}

console.log("Part 1", part1());
console.log("Part 2", part2());
