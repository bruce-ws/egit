import { execa } from 'execa'
import { type IGitCommand } from '@/type'

class StatusCommand implements IGitCommand {
  async execute(): Promise<void> {
    try {
      await execa('git', ['status'])
    } catch (error: unknown) {
      if (error instanceof Error) console.error(`状态查询出错[git status]: ${error.message}`)
      throw error
    }
  }
}

export default StatusCommand
