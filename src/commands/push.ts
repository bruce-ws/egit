import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'
class PushCommand implements IGitCommand {
  async execute() {
    try {
      return await execa('git', ['push'])
    } catch (error: unknown) {
      if (error instanceof Error) outputRes(`推送远端出错[git push]: ${error.message}`, 124)
      throw error
    }
  }
}

export default PushCommand
