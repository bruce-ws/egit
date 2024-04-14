// add-command.test.ts
import { execa } from 'execa'
import AddCommad from '@/commands/add'

jest.mock('execa') // 首先对 execa 进行 mock

describe('AddCommad', () => {
  let addCommand: AddCommad
  const mockExeca = jest.mocked(execa) // 获取mock实例

  beforeEach(() => {
    mockExeca.mockReset()
  })

  it('should call git add with no files', async () => {
    addCommand = new AddCommad({})
    await addCommand.execute()

    expect(mockExeca).toHaveBeenCalledWith('git', ['add', '-A'])
    expect(mockExeca).toHaveBeenCalledTimes(1)
  })

  it('should call git add with specific files', async () => {
    const files: string[] = ['file1.txt', 'file2.txt']
    addCommand = new AddCommad({ files })
    await addCommand.execute()

    expect(mockExeca).toHaveBeenCalledWith('git', ['add', ...files])
    expect(mockExeca).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when executing git add', async () => {
    const expectedError = new Error('Mocked Git Error')
    mockExeca.mockRejectedValue(expectedError)

    addCommand = new AddCommad({})
    try {
      await addCommand.execute()
    } catch (error) {
      expect(error).toBe(expectedError)
      expect(console.error).toHaveBeenCalledWith(`向暂存区添加更改时出错[git add]: ${expectedError.message}`)
    }
  })
})
