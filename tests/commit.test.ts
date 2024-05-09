import { jest, expect } from '@jest/globals'
import CommitCommand from '@/commands/commit'
import { execa } from 'execa' // 注意：在实际测试环境中，可能需要使用mock来替代真实执行git命令
jest.mock('execa')

describe('AddCommand', () => {
  let commitCommand: CommitCommand

  beforeEach(() => {
    commitCommand = new CommitCommand({ files: ['file.txt'], msg: '提交commit信息' })
  })

  it('应该是IGitCommand的一个实例', () => {
    expect(commitCommand).toBeInstanceOf(CommitCommand)
  })

  it('执行git commit命令当有文件的时候', async () => {
    commitCommand = new CommitCommand({ files: ['file.txt'], msg: '提交commit信息' })
    await commitCommand.execute()
    expect(execa).toHaveReturnedTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['commit', 'file.txt', '-m', '提交commit信息'])
  })

  it('执行git commit命令当没有指定具体文件的时候', async () => {
    commitCommand = new CommitCommand({ msg: '提交commit信息' })
    await commitCommand.execute()
    expect(execa).toHaveReturnedTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['commit', '-m', '提交commit信息'])
  })

  it('处理git commit执行过程中的错误吗', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const errorMessage = 'Git commit failed'
    ;(execa as jest.Mock).mockRejectedValue(new Error(errorMessage) as never)

    const addCmd = new CommitCommand({ files: ['file.txt'], msg: '错误' })
    await expect(addCmd.execute()).rejects.toThrow(`${errorMessage}`)
    expect(console.error).toHaveBeenCalledWith(`提交更改时出错[git commit]: ${errorMessage}`)
    console.error = originalError
  })
})
