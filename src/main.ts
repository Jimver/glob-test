import * as core from '@actions/core'
import * as glob from '@actions/glob'
import fs from 'fs'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  // Create a file in the current working directory using fs.promises
  const filePath = `test.txt`
  core.debug(`Creating file at ${filePath}`)
  fs.promises.writeFile(filePath, `test content`)

  // List files in current directory using fs.promises
  const filesInCurrentDirectory = await fs.promises.readdir(`.`)
  core.debug(`Files in current directory: ${filesInCurrentDirectory}`)
  // List files in current directory using glob
  const globber = await glob.create(`*`)
  const filesInCurrentDirectoryGlob = await globber.glob()
  core.debug(
    `Files in current directory (glob): ${filesInCurrentDirectoryGlob}`
  )
}
