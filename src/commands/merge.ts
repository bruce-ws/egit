import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'

interface IMergeOptions {
  branchName: string
}

class MergeCommand implements IGitCommand<IMergeOptions> {
  private options: IMergeOptions

  constructor(options: IMergeOptions) {
    this.options = options
  }

  async execute() {
    // 执行git merge命令，传入待合并的分支名
    const args = ['merge', this.options.branchName]
    try {
      return await execa('git', args)
    } catch (error: unknown) {
      if (error instanceof Error) {
        // 错误处理逻辑，使用outputRes输出错误信息
        outputRes(`合并分支出错[git ${args.join(' ')}]: ${error.message}`, 124)
      }
      throw error
    }
  }
}

export default MergeCommand
