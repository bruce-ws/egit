import { execa } from 'execa'
import AddCommad from '@/commands/add'
import { jest } from '@jest/globals'

jest.mock('execa')

describe('AddCommad', () => {
  let addCommand: AddCommad

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('没有指定文件的时候调用git add', async () => {
    addCommand = new AddCommad({})
    await addCommand.execute()

    expect(execa).toHaveBeenCalledWith('git', ['add', '-A'])
  })

  it('添加特定文件时候调用git add xxx', async () => {
    const testFiles = ['test1.txt']
    addCommand = new AddCommad({ files: testFiles })
    await addCommand.execute()

    expect(execa).toHaveBeenCalledWith('git', ['add', ...testFiles])
  })

  it('执行git add 处理错误  ', async () => {
    const mockError = new Error('模拟git添加错误')
    ;(execa as jest.MockedFunction<typeof execa>).mockRejectedValueOnce(mockError)

    addCommand = new AddCommad({})

    try {
      await addCommand.execute()
    } catch (error) {
      expect(error).toBe(mockError)
      expect(console.error).toHaveBeenCalledWith(`向暂存区添加更改时出错[git add]: ${mockError.message}`)
    }
  })
})
