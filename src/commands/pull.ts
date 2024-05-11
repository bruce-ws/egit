import { execa } from 'execa'
import { type IGitCommand } from '@/type'

interface IPullOptions {
  rebase?: boolean
}

class PullCommand implements IGitCommand {
  public rebase: boolean

  constructor(options: IPullOptions = {}) {
    this.rebase = options.rebase || false
  }

  async execute(): Promise<void> {
    try {
      const args = this.rebase ? ['--rebase'] : []
      await execa('git', ['pull', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`拉取远程分支时出错[git pull]: ${error.message}`)
      }
      throw error
    }
  }
}

export default PullCommand
