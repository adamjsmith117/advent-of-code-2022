import { readData } from '../util'
import { pipe } from 'fp-ts/function'

const solve = (data: string[]): number => {
  return -1
}

// =============================================================================

const DAY = -1
const TEST = true

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === -1)
