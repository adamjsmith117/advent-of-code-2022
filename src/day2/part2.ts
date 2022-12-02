import { readData } from '../../shared/util'
import { pipe } from 'fp-ts/function'
import * as R from 'ramda'

type RPS = 'rock' | 'paper' | 'scissors'
type Outcome = 'win' | 'loss' | 'draw'
type Round = {
  opponent: RPS
  desiredOutcome: Outcome
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
    default:
      throw new Error(`Unrecognized input: ${c}`)
  }
}

const charToOutcome = (c: string): Outcome => {
  switch (c) {
    case 'X':
      return 'loss'
    case 'Y':
      return 'draw'
    case 'Z':
      return 'win'
    default:
      throw new Error(`Unrecognized input: ${c}`)
  }
}

const getProperResponse = (r: Round): RPS => {
  if (r.desiredOutcome === 'draw') {
    return r.opponent
  }
  if (r.desiredOutcome === 'loss') {
    if (r.opponent === 'rock') return 'scissors'
    if (r.opponent === 'paper') return 'rock'
    if (r.opponent === 'scissors') return 'paper'
  }
  if (r.desiredOutcome === 'win') {
    if (r.opponent === 'rock') return 'paper'
    if (r.opponent === 'paper') return 'scissors'
    if (r.opponent === 'scissors') return 'rock'
  }
  throw new Error(`Unrecognized value: ${r.desiredOutcome}`)
}

const scoreRound = (r: Round): number =>
  points[r.desiredOutcome] + points[getProperResponse(r)]

const getFinalScore = (g: Guide): number => R.sum(g.map(scoreRound))

const solve = (data: string[]): number => {
  const guide = data.map((v) => ({
    opponent: charToRPS(v.split(' ')[0]),
    desiredOutcome: charToOutcome(v.split(' ')[1]),
  }))
  return getFinalScore(guide)
}

// =============================================================================

const DAY = 2
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 12881)
