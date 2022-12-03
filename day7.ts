// https://adventofcode.com/2020/day/7
import * as fs from 'fs';
import { sum } from './utils';

const input = fs.readFileSync('inputs/day7.txt', 'utf8');

const rules = input.split('\n').map((row) => {
  const [bagName, childrenInput] = row.split(' bags contain ');
  if (childrenInput === 'no other bags.') {
    return { bagName, children: [] };
  }
  const children = childrenInput.split(', ').map((childInput) => {
    const count = +childInput[0]; // Assumption: count is always between 1-9
    return {
      count,
      name: childInput.slice(2, count === 1 ? -4 : -5).trim(), // number and " bag."/" bags." not included
    };
  });
  return { bagName, children };
});

type Bag = {
  bagName: string;
  parents: Bag[];
  children: BagChild[];
};

type BagChild = {
  count: number;
  bag: Bag;
};

const bagsMap: Record<string, Bag> = {};

for (let rule of rules) {
  const bag = getOrCreateBag(rule.bagName);
  bag.children = rule.children.map((child) => ({
    count: child.count,
    bag: getOrCreateBag(child.name),
  }));
  for (let child of bag.children) {
    child.bag.parents.push(bag);
  }
}

function part1() {
  const goldBag = bagsMap['shiny gold'];
  return new Set(getParents(goldBag)).size - 1;
}

function part2() {
  const goldBag = bagsMap['shiny gold'];
  return getChildCount({ count: 0, bag: goldBag }) - 1;
}

function getOrCreateBag(name: string) {
  if (!bagsMap[name]) {
    bagsMap[name] = {
      bagName: name,
      parents: [],
      children: [],
    };
  }
  return bagsMap[name];
}

// Includes bag itself
function getParents(bag: Bag): Bag[] {
  if (bag.parents.length === 0) {
    return [bag];
  }
  return [bag, ...bag.parents.flatMap(getParents)];
}

// Included parent
function getChildCount(child: BagChild): number {
  if (child.bag.children.length === 0) {
    return 1;
  }
  return 1 + sum(child.bag.children, child2 => child2.count * getChildCount(child2));
}

console.log('Part 1', part1());
console.log('Part 2', part2());
