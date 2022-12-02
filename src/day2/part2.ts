import { readData } from '../../shared/util'
import { pipe } from 'fp-ts/function'

const solve = (data: string[]): number => {
  return -1
}

// =============================================================================

const DAY = 2
const TEST = true

const answer = pipe(readData({ day: DAY, test: TEST, delimiter: '\n' }), solve)
console.log(answer)
console.assert(answer === -1)
