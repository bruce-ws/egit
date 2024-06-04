import { jest, expect } from '@jest/globals'
import PullCommand from '@/commands/pull'
import { execa } from 'execa' // 注意：在实际测试环境中，可能需要使用mock来替代真实执行git命令
import { outputRes as mockOutputRes } from '@/utils/index'
jest.mock('execa')
jest.mock('@/utils/index', () => ({
  outputRes: jest.fn(), // mock outputRes函数
}))
describe('AddCommand', () => {
  let pullCommand: PullCommand

  beforeEach(() => {
    pullCommand = new PullCommand({ rebase: true })
  })

  it('应该是IGitCommand的一个实例', () => {
    expect(pullCommand).toBeInstanceOf(PullCommand)
  })

  it('执行git pull命令没指定合并方式rebase', async () => {
    pullCommand = new PullCommand()
    await pullCommand.execute()
    expect(execa).toHaveBeenCalledTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['pull'])
  })

  it('执行git pull命令指定合并方式rebase', async () => {
    pullCommand = new PullCommand({ rebase: true })
    await pullCommand.execute()
    // 验证execa被正确调用了1次，并且带有正确的参数
    expect(execa).toHaveBeenCalledTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['pull', '--rebase'])
  })

  it('处理git pull执行过程中的错误吗', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const errorMessage = 'Git pull failed'
    ;(execa as jest.Mock).mockRejectedValue(new Error(errorMessage) as never)

    const addCmd = new PullCommand()
    await expect(addCmd.execute()).rejects.toThrow(`${errorMessage}`)
    expect(mockOutputRes).toHaveBeenCalledWith(`拉取远程分支时出错[git pull]: ${errorMessage}`, 124)
    console.error = originalError
  })
})
