import BranchCommand from '@/commands/branch'
import { ICreateBranchOptions, IDeleteBranchOptions, IViewLocalBranchOptions } from '../src/type' // 确保路径正确
import { execa } from 'execa'
jest.mock('execa') // 使用mock来避免实际执行git命令

describe('BranchCommand', () => {
  let branchCmd: BranchCommand

  beforeEach(() => {
    branchCmd = new BranchCommand()
    jest.clearAllMocks() // 在每个测试开始前清除所有mock
  })

  describe('execute', () => {
    it('默认情况查看本地分支', async () => {
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch'])
    })

    it('基于某个分支创建新分支', async () => {
      const options: ICreateBranchOptions = { branchName: 'feature-branch', fromBranch: 'main' }
      await branchCmd.execute(options)
      expect(execa).toHaveBeenCalledWith('git', ['branch', 'feature-branch', 'main'])
    })
    it('基于当前分支创建新分支', async () => {
      const options: ICreateBranchOptions = { branchName: 'feature-branch' }
      await branchCmd.execute(options)
      expect(execa).toHaveBeenCalledWith('git', ['branch', 'feature-branch'])
    })

    it('强制删除分支', async () => {
      const options: IDeleteBranchOptions = { branchName: 'old-feature', force: true }
      await branchCmd.execute(options)
      expect(execa).toHaveBeenCalledWith('git', ['branch', '-D', 'old-feature'])
    })

    it('当执行all 查看所有分支', async () => {
      const options: IViewLocalBranchOptions = { all: true }
      await branchCmd.execute(options)
      expect(execa).toHaveBeenCalledWith('git', ['branch', '-a'])
    })

    it('错误处理', async () => {
      const originalError = console.error
      console.error = jest.fn()
      ;(execa as jest.Mock).mockRejectedValueOnce(new Error('Mocked Git Error'))

      await expect(branchCmd.execute({ branchName: 'test' })).rejects.toThrow('Mocked Git Error')
      expect(console.error).toHaveBeenCalledWith('执行Git分支命令时出错: Mocked Git Error')
      console.error = originalError
    })
  })
})
