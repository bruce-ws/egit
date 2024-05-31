import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'

interface IPullOptions {
  rebase?: boolean
}

class PullCommand implements IGitCommand {
  public rebase: boolean

  constructor(options: IPullOptions = {}) {
    this.rebase = options.rebase || false
  }

  async execute() {
    try {
      const args = this.rebase ? ['--rebase'] : []
      return await execa('git', ['pull', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) {
        outputRes(`拉取远程分支时出错[git pull]: ${error.message}`, 124)
      }
      throw error
    }
  }
}

export default PullCommand
