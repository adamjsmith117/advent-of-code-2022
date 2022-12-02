import { readData } from '../../shared/util'
import { pipe } from 'fp-ts/function'
import * as R from 'ramda'

type Calorie = number
type Inventory = Calorie[]

const solve = (data: string[]): number => {
  const invs = [] as Inventory[]
  let currentInv = [] as Inventory
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '') {
      invs.push(currentInv)
      currentInv = []
    } else {
      currentInv.push(Number(data[i]))
    }
  }
  invs.push(currentInv)

  const sortedInvs = R.sortBy(R.sum)(invs)
  return R.sum(sortedInvs.pop()!)
}

// =============================================================================

const DAY = 1
const TEST = false

const answer = pipe(readData({ day: DAY, test: TEST, delimiter: '\n' }), solve)
console.log(answer)
console.assert(answer === 69177)
