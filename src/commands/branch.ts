import { execa, type ExecaReturnValue } from 'execa'
import { IGitCommand, ICreateBranchOptions, IDeleteBranchOptions, IViewLocalBranchOptions } from '@/type'
import { outputRes } from '@/utils/index'
class BranchCommand implements IGitCommand<ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions> {
  private options: ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions | undefined
  constructor(optopns?: ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions) {
    this.options = optopns
  }
  async execute() {
    try {
      if (this.options) {
        switch (true) {
          case 'branchName' in this.options: // 共享属性检查
            if ('fromBranch' in this.options) {
              // 指明原始分支的创建
              return await this.createBranch(this.options as ICreateBranchOptions)
            } else if ('force' in this.options) {
              // 删除分支
              return await this.deleteBranch(this.options as IDeleteBranchOptions)
            } else {
              // 基于默认分支的创建
              return await this.createBranch(this.options as ICreateBranchOptions)
            }
          case 'all' in this.options:
            return await this.viewBranch(this.options as IViewLocalBranchOptions)
          default:
            return await this.viewBranch({ all: false })
        }
      } else {
        // 默认为查看当前本地分支
        return await this.viewBranch({ all: false })
      }
    } catch (error) {
      if (error instanceof Error) {
        outputRes(`执行Git分支命令时出错: ${error.message}`, 124)
      }
      throw error
    }
  }

  private async createBranch(options: ICreateBranchOptions): Promise<ExecaReturnValue<string>> {
    return await execa('git', ['branch', options.branchName, ...(options.fromBranch ? [options.fromBranch] : [])])
  }

  private async deleteBranch(options: IDeleteBranchOptions): Promise<ExecaReturnValue<string>> {
    const args = options.force ? ['-D'] : ['-d']
    return await execa('git', ['branch', ...args, options.branchName])
  }

  private async viewBranch(options: IViewLocalBranchOptions = { all: false }): Promise<ExecaReturnValue<string>> {
    const args = options.all ? ['-a'] : []
    return await execa('git', ['branch', ...args])
  }
}

export default BranchCommand
