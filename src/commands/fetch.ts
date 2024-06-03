import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'

interface IFetchOptions {
  remote?: string
  branch?: string
}

class FetchCommand implements IGitCommand {
  private remote: string
  private branch: string

  constructor(options: IFetchOptions = {}) {
    this.remote = options.remote || 'origin'
    this.branch = options.branch || 'master'
  }

  async execute() {
    try {
      const args = [this.remote, this.branch]
      return await execa('git', ['fetch', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) {
        outputRes(`拉取远程分支时出错[git fetch]: ${error.message}`, 124)
      }
      throw error
    }
  }
}

export default FetchCommand
