import { execa } from 'execa'
import { type IGitCommand } from '@/type'

class PushCommand implements IGitCommand {
  async execute() {
    try {
      return await execa('git', ['push'])
    } catch (error: unknown) {
      if (error instanceof Error) console.error(`推送远端出错[git push]: ${error.message}`)
      throw error
    }
  }
}

export default PushCommand
