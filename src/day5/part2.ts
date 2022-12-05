import { readData } from '../util'
import { pipe } from 'fp-ts/function'

type CrateStack = string[]
type Instruction = { num: number; from: number; to: number }

const solve = (data: string[]): string => {
  const stackLines = data.slice(0, data.findIndex((v) => v === '') - 1)
  const instLines = data.slice(data.findIndex((v) => v === '') + 1)

  const stacks: CrateStack[] = []
  stackLines.forEach((line) => {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i].trim() === '') continue
      const idx = (i - 1) / 4
      if (!stacks[idx]) stacks[idx] = [] as CrateStack
      stacks[idx].push(line[i])
    }
  })

  const instructions: Instruction[] = instLines.map((line) => {
    const nums = line.match(/\d*/g)?.filter(Boolean)
    if (!nums) throw Error
    return {
      num: Number(nums[0]),
      from: Number(nums[1]),
      to: Number(nums[2]),
    }
  })

  const result = runInstructions(stacks, instructions)

  return result.reduce((ans, cur) => `${ans}${cur[0]}`, '')
}

const runInstructions = (
  stacks: CrateStack[],
  instructions: Instruction[]
): CrateStack[] => {
  instructions.forEach((inst: Instruction) => {
    const crates = Array.from({ length: inst.num }).map(() =>
      stacks[inst.from - 1].shift()
    )
    crates.reverse().forEach((crate) => stacks[inst.to - 1].unshift(crate!))
  })
  return stacks
}

// =============================================================================

const DAY = 5
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)
console.assert(answer === 'RNRGDNFQG')
