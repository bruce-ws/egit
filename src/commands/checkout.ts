import { execa } from 'execa'
import { type IGitCommand } from '@/type'

class CheckoutCommand implements IGitCommand {
  private branchOrCommit: string

  constructor(branchOrCommit: string) {
    this.branchOrCommit = branchOrCommit
  }

  async execute() {
    try {
      return await execa('git', ['checkout', this.branchOrCommit])
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`切换分支或恢复操作出错[git checkout: ${this.branchOrCommit}] ${error.message}`)
      }
      throw error
    }
  }
}

export default CheckoutCommand
