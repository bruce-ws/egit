import { jest, expect } from '@jest/globals'
import AddCommand from '@/commands/add'
import { execa } from 'execa' // 注意：在实际测试环境中，可能需要使用mock来替代真实执行git命令
import { outputRes as mockOutputRes } from '@/utils/index'
jest.mock('execa')
jest.mock('@/utils/index', () => ({
  outputRes: jest.fn(), // mock outputRes函数
}))
describe('AddCommand', () => {
  let addCommand: AddCommand

  beforeEach(() => {
    addCommand = new AddCommand({ files: [] })
  })

  it('应该是IGitCommand的一个实例', () => {
    expect(addCommand).toBeInstanceOf(AddCommand)
  })

  it('当没有提供特定文件时，应该调用git add -A吗', async () => {
    await addCommand.execute()
    expect(execa).toHaveReturnedTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['add', '-A'])
  })

  it('应该调用git添加指定的文件吗', async () => {
    const files = ['file1.txt', 'file2.txt']
    const commandWithFiles = new AddCommand({ files })
    await commandWithFiles.execute()
    expect(execa).toHaveBeenCalledWith('git', ['add', ...files])
  })

  it('处理git add执行过程中的错误吗', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const errorMessage = 'Git add failed'
    ;(execa as jest.Mock).mockRejectedValue(new Error(errorMessage) as never)

    const addCmd = new AddCommand({ files: ['file.txt'] })
    await expect(addCmd.execute()).rejects.toThrow(`${errorMessage}`)
    expect(mockOutputRes).toHaveBeenCalledWith(`向暂存区添加更改时出错[git add]: ${errorMessage}`, 124)
    console.error = originalError
  })
})
