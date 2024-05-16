import { execa, type ExecaReturnValue } from 'execa'
import { IGitCommand, ICreateBranchOptions, IDeleteBranchOptions, IViewLocalBranchOptions } from '@/type'

class BranchCommand implements IGitCommand<ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions> {
  async execute(options?: ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions) {
    try {
      if (options) {
        switch (true) {
          case 'branchName' in options: // 共享属性检查
            if ('fromBranch' in options) {
              // 指明原始分支的创建
              return await this.createBranch(options as ICreateBranchOptions)
            } else if ('force' in options) {
              // 删除分支
              return await this.deleteBranch(options as IDeleteBranchOptions)
            } else {
              // 基于默认分支的创建
              return await this.createBranch(options as ICreateBranchOptions)
            }
          case 'all' in options:
            return await this.viewBranch(options as IViewLocalBranchOptions)
          default:
            return await this.viewBranch({ all: false })
        }
      } else {
        // 默认为查看当前本地分支
        return await this.viewBranch({ all: false })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`执行Git分支命令时出错: ${error.message}`)
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
