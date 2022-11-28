import * as fs from 'fs'

/**
 * Reads the data needed to run solutions for the provided day & scenario
 * @param day Which day of Advent of Code to read the data for
 * @param test Flag to read the test or real data for the given day
 * @param delimiter Delimeter to split the file's contents by, defaults to \n
 * @returns Parsed/split data for the specified day & scenario
 */
export const readData = (args: {
  day: number
  test: boolean
  delimiter?: string
}) =>
  readFile(
    `data/day${args.day}/${args.test ? 'test' : 'data'}.txt`,
    args.delimiter ?? '\n'
  )

/**
 * Reads file at given path and splits buffer as a string by given delimiter
 * @param path path to file to be read
 * @param delimiter optional, defaults to "\n".
 * @returns string[] file read at provided path split by delimiter
 */
export const readFile = (path: string, delimiter: string = '\n'): string[] =>
  fs.readFileSync(path).toString().split(delimiter)
