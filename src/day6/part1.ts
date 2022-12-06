import { readData } from '../util'
import { pipe } from 'fp-ts/function'
import * as R from 'ramda'

const solve = (data: string[]): number | undefined => {
  const buffer = data[0].split('')
  let result: number | undefined = undefined
  for (let i = 0; i < buffer.length - 5; i++) {
    const vals = buffer.slice(i, i + 4)
    if (R.uniq(vals).length === 4) {
      result = i + 4
      break
    }
  }
  return result
}

// =============================================================================

const DAY = 6
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 1757)
