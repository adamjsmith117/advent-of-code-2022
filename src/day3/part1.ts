import { pipe } from 'fp-ts/function'
import * as R from 'ramda'
import { readData } from '../util'

type Rucksack = string[][]

const getCommonItem = (r: Rucksack): string | undefined => {
  let foundCommonItem: string | undefined = undefined
  r[0].forEach((target) => {
    const found = r[1].find((i) => i === target)
    if (found) foundCommonItem = found
  })
  return foundCommonItem
}

const convertToPriorityPoints = (i: string): number =>
  /[a-z]/.test(i) ? i.charCodeAt(0) - 96 : i.charCodeAt(0) - 38

const solve = (data: string[]): number => {
  const rucksacks = data.map((line) => {
    const els = line.split('')
    const half = Math.ceil(els.length / 2)

    const firstHalf = els.slice(0, half)
    const secondHalf = els.slice(half)

    return [firstHalf, secondHalf]
  })

  const commonItems = rucksacks.map(getCommonItem).filter(Boolean) as string[]
  const points = commonItems.map(convertToPriorityPoints)

  return R.sum(points)
}

// =============================================================================

const DAY = 3
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 8298)
