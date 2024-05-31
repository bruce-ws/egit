import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'
class StatusCommand implements IGitCommand {
  async execute() {
    try {
      return await execa('git', ['status'])
    } catch (error: unknown) {
      if (error instanceof Error) outputRes(`状态查询出错[git status]: ${error.message}`, 124)
      throw error
    }
  }
}

export default StatusCommand
