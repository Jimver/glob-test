import * as core from '@actions/core'
import * as glob from '@actions/glob'
import fs from 'fs'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  // Create directory using fs.promises
  const dirPath = `test-dir`
  core.debug(`Creating directory at ${dirPath}`)
  await fs.promises.mkdir(dirPath, { recursive: true })

  // Create a file in the current working directory using fs.promises
  const filePath = `${dirPath}/test.txt`
  core.debug(`Creating file at ${filePath}`)
  fs.promises.writeFile(filePath, `test content`)

  // List files in test directory using fs.promises
  const filesInCurrentDirectory = await fs.promises.readdir(dirPath)
  core.debug(`Files in test directory '${dirPath}': ${filesInCurrentDirectory}`)
  // List files in current directory using glob
  const globPattern = `${dirPath}/*`
  const globber = await glob.create(globPattern)
  const filesInCurrentDirectoryGlob = await globber.glob()
  core.debug(
    `Files in test directory (glob: '${globPattern}'): ${filesInCurrentDirectoryGlob}`
  )

  // Get absolute path of test directory
  const absolutePath = fs.realpathSync(dirPath)
  core.debug(`Absolute path of test directory: ${absolutePath}`)

  // List files in absolute path using fs.promises
  const filesInAbsolutePath = await fs.promises.readdir(absolutePath)
  core.debug(`Files in absolute path '${absolutePath}': ${filesInAbsolutePath}`)
  // List files in absolute path using glob
  const globPatternAbsolute = `${absolutePath}/*`
  const globberAbsolute = await glob.create(globPatternAbsolute)
  const filesInAbsolutePathGlob = await globberAbsolute.glob()
  core.debug(
    `Files in absolute path (glob: '${globPatternAbsolute}'): ${filesInAbsolutePathGlob}`
  )

  if (filesInCurrentDirectoryGlob.length === 0) {
    throw new Error(
      `No files found in current directory using glob ${globPattern}: ${filesInCurrentDirectoryGlob}`
    )
  }

  if (filesInAbsolutePathGlob.length === 0) {
    throw new Error(
      `No files found in absolute path using glob ${globPatternAbsolute}: ${filesInAbsolutePathGlob}`
    )
  }
  if (filesInCurrentDirectory.length === 0) {
    throw new Error(
      `No files found in current directory using readdir ${dirPath}: ${filesInCurrentDirectory}`
    )
  }
  if (filesInAbsolutePath.length === 0) {
    throw new Error(
      `No files found in absolute path using readdir ${absolutePath}: ${filesInAbsolutePath}`
    )
  }
}
