import { pipe } from 'fp-ts/function'
import * as R from 'ramda'
import { readData } from '../../shared/util'

type Group = Rucksack[]
type Rucksack = string[]

const getCommonItem = (g: Group): string | undefined => {
  let foundCommonItem: string | undefined = undefined
  g[0].forEach((target) => {
    const group2Found = g[1].find((i) => i === target)
    const group3Found = g[2].find((i) => i === target)
    if (group2Found && group3Found) {
      foundCommonItem = group3Found
    }
  })
  return foundCommonItem
}

const convertToPriorityPoints = (i: string): number =>
  /[a-z]/.test(i) ? i.charCodeAt(0) - 96 : i.charCodeAt(0) - 38

const solve = (data: string[]): number => {
  const rucksacks = data.map((line) => line.split(''))
  const groups: Group[] = []
  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]])
  }

  const commonItems = groups.map(getCommonItem).filter(Boolean) as string[]
  const points = commonItems.map(convertToPriorityPoints)

  return R.sum(points)
}

// =============================================================================

const DAY = 3
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 2708)
