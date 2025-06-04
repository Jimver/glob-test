import * as fs from 'fs'
import * as glob from '@actions/glob'

const dirPath = `test-dir`
const fileName = `test.txt`
const filePath = `${dirPath}/${fileName}`

describe('glob.ts', () => {
  beforeEach(async () => {
    // Create directory using fs.promises
    await fs.promises.mkdir(dirPath, { recursive: true })

    // Create a file in the test directory using fs.promises
    await fs.promises.writeFile(filePath, `test content`)
  })

  it('Create file and check if it is there using glob * pattern', async () => {
    // List files in test directory using glob
    const globber = await glob.create(`${dirPath}/*`)
    const filesInCurrentDirectoryGlob = await globber.glob()

    expect(filesInCurrentDirectoryGlob).toHaveLength(1)
    expect(filesInCurrentDirectoryGlob[0]).toContain(fileName)
    expect(filesInCurrentDirectoryGlob[0]).toContain(dirPath)
  })

  it('Create file and check if it is there using glob ** pattern', async () => {
    // List files in test directory using glob
    const globber = await glob.create(`${dirPath}/**`)
    const filesInCurrentDirectoryGlob = await globber.glob()

    expect(filesInCurrentDirectoryGlob).toHaveLength(2)
    expect(filesInCurrentDirectoryGlob[0]).toContain(dirPath)
    expect(filesInCurrentDirectoryGlob[1]).toContain(dirPath)
    expect(
      filesInCurrentDirectoryGlob[0].includes(fileName) ||
        filesInCurrentDirectoryGlob[1].includes(fileName)
    ).toBeTruthy()
  })

  it('Create file and check if it is there using readdir', async () => {
    // List files in test directory using fs.promises
    const filesInCurrentDirectory = await fs.promises.readdir(dirPath)

    expect(filesInCurrentDirectory).toContain('test.txt')
  })

  afterEach(async () => {
    // Cleanup: Remove the created file and directory
    await fs.promises.unlink(filePath)
    await fs.promises.rmdir(dirPath, { recursive: true })
  })
})
