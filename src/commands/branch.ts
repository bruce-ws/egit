import { execa } from 'execa'
import { IGitCommand, ICreateBranchOptions, IDeleteBranchOptions, IViewLocalBranchOptions } from '@/type'

class BranchCommand implements IGitCommand<ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions> {
  async execute(options?: ICreateBranchOptions | IDeleteBranchOptions | IViewLocalBranchOptions): Promise<void> {
    try {
      if (options) {
        switch (true) {
          case 'branchName' in options: // 共享属性检查
            if ('startPoint' in options) {
              // 指明原始分支的创建
              await this.createBranch(options as ICreateBranchOptions)
            } else if ('force' in options) {
              // 删除分支
              await this.deleteBranch(options as IDeleteBranchOptions)
            } else {
              // 基于默认分支的创建
              await this.createBranch(options as ICreateBranchOptions)
            }
            break
          case 'all' in options:
            await this.viewBranch(options as IViewLocalBranchOptions)
            break
          default:
            await this.viewBranch({ all: false })
        }
      } else {
        // 默认为查看当前本地分支
        await this.viewBranch({ all: false })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`执行Git分支命令时出错: ${error.message}`)
      }
      throw error
    }
  }

  private async createBranch(options: ICreateBranchOptions): Promise<void> {
    await execa('git', ['branch', options.branchName, ...(options.startPoint ? [options.startPoint] : [])])
  }

  private async deleteBranch(options: IDeleteBranchOptions): Promise<void> {
    const args = options.force ? ['-D'] : ['-d']
    await execa('git', ['branch', ...args, options.branchName])
  }

  private async viewBranch(options: IViewLocalBranchOptions = { all: false }): Promise<void> {
    const args = options.all ? ['-a'] : []
    await execa('git', ['branch', ...args])
  }
}

export default BranchCommand
