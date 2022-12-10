import { readData } from '../util'
import { pipe } from 'fp-ts/function'
import * as R from 'ramda'

type Filesystem = Record<string, Dir>
type Dir = {
  id: string
  path: string
  files: { id: string; size: number }[]
  dirs: string[]
  size?: number
}
const dirsByPath = {} as Filesystem

const getPath = (currentPath: string, id: string): string =>
  `${currentPath}/${id}`.replace('//', '/')

const parseInput = (data: string[]) => {
  let currentPath = ''
  dirsByPath['/'] = { id: '/', path: '/', files: [], dirs: [] }
  let i = 0
  while (i < data.length) {
    let line = data[i]
    if (line.startsWith('$ cd ')) {
      const id = line.split('cd ')[1]
      if (id === '..' && currentPath !== '/') {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
      } else {
        currentPath = getPath(currentPath, id)
      }
      i++
    } else if (line.startsWith('$ ls')) {
      i++
      line = data[i]
      while (line && !line.startsWith('$')) {
        if (line.startsWith('dir ')) {
          const id = line.split('dir ')[1]
          dirsByPath[getPath(currentPath, id)] = {
            id,
            path: getPath(currentPath, id),
            files: [],
            dirs: [],
          }
          dirsByPath[currentPath].dirs.push(id)
        } else {
          dirsByPath[currentPath].files.push({
            id: line.split(' ')[1],
            size: Number(line.split(' ')[0]),
          })
        }
        i++
        line = data[i]
      }
    }
  }
}

const dirSize = (path: string): number => {
  if (dirsByPath[path].size) {
    return dirsByPath[path].size!
  }
  const size =
    R.sum(dirsByPath[path].files.map((f) => f.size)) +
    dirsByPath[path].dirs.reduce((sum, id) => {
      const size =
        dirsByPath[getPath(path, id)].size ?? dirSize(getPath(path, id))
      dirsByPath[getPath(path, id)].size = size
      return sum + size
    }, 0)
  dirsByPath[path].size = size
  return size
}

const sumDirsUnderThreshold = (): number =>
  R.sum(
    Object.values(dirsByPath)
      .filter((d: Dir) => d.size! <= 100_000)
      .map((d: Dir) => d.size!)
  )

const recordDirSizes = () => dirSize('/')

const solve = (data: string[]): number =>
  pipe(data, parseInput, recordDirSizes, sumDirsUnderThreshold)

// =============================================================================

const DAY = 7
const TEST = false

const answer = pipe({ day: DAY, test: TEST, delimiter: '\n' }, readData, solve)
console.log(answer)

if (TEST) {
  console.log(JSON.stringify(dirsByPath, null, 2))
  console.assert(dirsByPath['/a/e'].size === 584)
  console.assert(dirsByPath['/a'].size === 94853)
  console.assert(dirsByPath['/d'].size === 24933642)
  console.assert(dirsByPath['/'].size === 48381165)
  console.assert(answer === 95437)
}
if (!TEST) {
  console.assert(answer > 1033267)
  console.assert(answer === 1453349)
}
