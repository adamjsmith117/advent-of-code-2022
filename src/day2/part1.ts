import { readData } from '../../shared/util'
import { pipe } from 'fp-ts/function'
import * as R from 'ramda'

type RPS = 'rock' | 'paper' | 'scissors'
type Outcome = 'win' | 'loss' | 'draw'
type Round = {
  opponent: RPS
  me: RPS
}
type Guide = Round[]

const points: Record<RPS | Outcome, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
  loss: 0,
  draw: 3,
  win: 6,
}

const charToRPS = (c: string): RPS => {
  switch (c) {
    case 'A':
      return 'rock'
    case 'B':
      return 'paper'
    case 'C':
      return 'scissors'
    case 'X':
      return 'rock'
    case 'Y':
      return 'paper'
    case 'Z':
      return 'scissors'
    default:
      throw new Error(`Unrecognized input: ${c}`)
  }
}

const getOutcome = (r: Round): Outcome => {
  if (r.me === 'rock') {
    if (r.opponent === 'rock') return 'draw'
    if (r.opponent === 'paper') return 'loss'
    if (r.opponent === 'scissors') return 'win'
  }
  if (r.me === 'paper') {
    if (r.opponent === 'rock') return 'win'
    if (r.opponent === 'paper') return 'draw'
    if (r.opponent === 'scissors') return 'loss'
  }
  if (r.me === 'scissors') {
    if (r.opponent === 'rock') return 'loss'
    if (r.opponent === 'paper') return 'win'
    if (r.opponent === 'scissors') return 'draw'
  }
  throw new Error(`Unrecognized value: ${r.me}`)
}

const scoreRound = (r: Round): number => points[r.me] + points[getOutcome(r)]

const getFinalScore = (g: Guide): number => R.sum(g.map(scoreRound))

const solve = (data: string[]): number => {
  const guide = data.map((v) => ({
    opponent: charToRPS(v.split(' ')[0]),
    me: charToRPS(v.split(' ')[1]),
  }))
  return getFinalScore(guide)
}

// =============================================================================

const DAY = 2
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 13682)
