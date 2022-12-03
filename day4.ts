// https://adventofcode.com/2020/day/4
import * as fs from 'fs';

const input = fs.readFileSync('inputs/day4.txt', 'utf8');

const passports = input.split('\n\n').map((passportInput) =>
  Object.fromEntries(
    passportInput
      .replace(/ /g, '\n')
      .split('\n')
      .map((field) => field.split(':') as [string, string])
  )
);

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validators = {
  byr(value: string) {
    return numberBetween(value, [1920, 2002]);
  },
  iyr(value: string) {
    return numberBetween(value, [2010, 2020]);
  },
  eyr(value: string) {
    return numberBetween(value, [2020, 2030]);
  },
  hgt(value: string) {
    const numberText = value.slice(0, -2);
    const unit = value.slice(-2);
    if (unit === 'cm') {
      return numberBetween(numberText, [150, 193]);
    } else if (unit === 'in') {
      return numberBetween(numberText, [59, 76]);
    }
    return false;
  },
  hcl(value: string) {
    return value.match(/^#[0-9a-f]{6}$/) !== null;
  },
  ecl(value: string) {
    const allowedValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return allowedValues.includes(value);
  },
  pid(value: string) {
    return value.match(/^\d{9}$/) !== null;
  },
};

function part1() {
  return passports.filter(isValid1).length;
}

function part2() {
  return passports.filter(isValid2).length;
}

function isValid1(passport: Record<string, string>) {
  return requiredFields.every((field) => passport[field]);
}
function isValid2(passport: Record<string, string>) {
  return requiredFields.every((field) => {
    return passport[field] && validators[field as keyof typeof validators](passport[field]);
  });
}

function numberBetween(numberText: string, [min, max]: [number, number]) {
  const number = parseInt(numberText);
  if (numberText !== number.toString()) {
    return false;
  }
  return min <= number && number <= max;
}

console.log('Part 1', part1());
console.log('Part 2', part2());
