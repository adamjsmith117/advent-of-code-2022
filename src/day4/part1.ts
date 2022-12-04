import { readData } from '../util'
import { pipe } from 'fp-ts/function'

const solve = (data: string[]): number => {
  const pairs = data.map((line) => {
    const [a, b] = line.split(',')
    return {
      a: [a.split('-')[0], a.split('-')[1]].map(Number),
      b: [b.split('-')[0], b.split('-')[1]].map(Number),
    }
  })

  let count = 0
  pairs.forEach((p) => {
    if (
      (p.a[0] <= p.b[0] && p.a[1] >= p.b[1]) ||
      (p.b[0] <= p.a[0] && p.b[1] >= p.a[1])
    ) {
      count++
    }
  })

  return count
}

// =============================================================================

const DAY = 4
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 413)
