import { readData } from '../../shared/util'

const run = (): number => {
  const data = readData({ day: -1, test: true, delimiter: '\n' })
  return -1
}

console.log(run())
