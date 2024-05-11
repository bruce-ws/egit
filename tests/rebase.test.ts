import RebaseCommand from '@/commands/rebase'
import { execa } from 'execa'
import { IGitCommand } from '@/type' // 确保类型导出路径正确

jest.mock('execa') // 使用 Jest 的 mock 功能来避免实际执行 git 命令

describe('RebaseCommand', () => {
  let rebaseCommand: IGitCommand
  beforeEach(() => {
    rebaseCommand = new RebaseCommand({})
  })

  it('应该是IGitCommand的一个实例', () => {
    expect(rebaseCommand).toBeInstanceOf(RebaseCommand)
  })

  it('当没有指定单个操作时应该抛出错误', async () => {
    const invalidOptions = {}
    const rebaseCmd = new RebaseCommand(invalidOptions)

    await expect(rebaseCmd.execute()).rejects.toThrow('请指定一个操作：branch进行rebase，或--continue，或--abort')
  })

  it('调用git rebase --continue', async () => {
    const continueOptions = { continue: true }
    const rebaseCmd = new RebaseCommand(continueOptions)

    await rebaseCmd.execute()

    expect(execa).toHaveBeenCalledWith('git', ['rebase', '--continue'])
  })

  it('调用git rebase --abort', async () => {
    const abortOptions = { abort: true }
    const rebaseCmd = new RebaseCommand(abortOptions)

    await rebaseCmd.execute()

    expect(execa).toHaveBeenCalledWith('git', ['rebase', '--abort'])
  })

  it('用一个特定的分支调用git rebase branchName', async () => {
    const branchOptions = { branch: 'feature-branch' }
    const rebaseCmd = new RebaseCommand(branchOptions)

    await rebaseCmd.execute()

    expect(execa).toHaveBeenCalledWith('git', ['rebase', 'feature-branch'])
  })

  it('正确处理错误', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const mockError = new Error('Mocked Git Error')
    ;(execa as jest.Mock).mockRejectedValue(mockError)
    const continueOptions = { continue: true }
    const rebaseCmd = new RebaseCommand(continueOptions)

    await expect(rebaseCmd.execute()).rejects.toThrow('Mocked Git Error')

    expect(console.error).toHaveBeenCalledWith('执行rebase时出错: 继续rebase [git rebase --continue]: Mocked Git Error')
    console.error = originalError
  })
})
