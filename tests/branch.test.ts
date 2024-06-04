import BranchCommand from '@/commands/branch'
import { ICreateBranchOptions, IDeleteBranchOptions, IViewLocalBranchOptions } from '../src/type' // 确保路径正确
import { execa } from 'execa'
import { outputRes as mockOutputRes } from '@/utils/index'
jest.mock('execa') // 使用mock来避免实际执行git命令
jest.mock('@/utils/index', () => ({
  outputRes: jest.fn(), // mock outputRes函数
}))
describe('BranchCommand', () => {
  beforeEach(() => {
    jest.clearAllMocks() // 在每个测试开始前清除所有mock
  })

  describe('execute', () => {
    it('默认情况查看本地分支', async () => {
      const branchCmd = new BranchCommand()
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch'])
    })

    it('基于某个分支创建新分支', async () => {
      const options: ICreateBranchOptions = { branchName: 'feature-branch', fromBranch: 'main' }
      const branchCmd = new BranchCommand(options)
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch', 'feature-branch', 'main'])
    })
    it('基于当前分支创建新分支', async () => {
      const options: ICreateBranchOptions = { branchName: 'feature-branch' }
      const branchCmd = new BranchCommand(options)
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch', 'feature-branch'])
    })

    it('强制删除分支', async () => {
      const options: IDeleteBranchOptions = { branchName: 'old-feature', force: true }
      const branchCmd = new BranchCommand(options)
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch', '-D', 'old-feature'])
    })

    it('当执行all 查看所有分支', async () => {
      const options: IViewLocalBranchOptions = { all: true }
      const branchCmd = new BranchCommand(options)
      await branchCmd.execute()
      expect(execa).toHaveBeenCalledWith('git', ['branch', '-a'])
    })

    it('错误处理', async () => {
      const originalError = console.error
      console.error = jest.fn()
      ;(execa as jest.Mock).mockRejectedValueOnce(new Error('Mocked Git Error'))
      const branchCmd = new BranchCommand({ branchName: 'test' })
      await expect(branchCmd.execute()).rejects.toThrow('Mocked Git Error')
      expect(mockOutputRes).toHaveBeenCalledWith('执行Git分支命令时出错: Mocked Git Error', 124)
      console.error = originalError
    })
  })
})
