import { execa } from 'execa'
import { type IGitCommand } from '@/type'

interface ICommitOptions {
  msg: string
  files?: string[]
}

class CommitCommand implements IGitCommand {
  public msg: string
  public files: string[]

  constructor(options: ICommitOptions) {
    this.msg = options.msg
    this.files = options.files || []
  }

  async execute(): Promise<void> {
    try {
      // 如果指定了文件，则将文件添加到commit命令中；否则，仅使用消息进行提交
      const args = [...this.files, '-m', this.msg]
      await execa('git', ['commit', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`提交更改时出错[git commit]: ${error.message}`)
      }
      throw error
    }
  }
}

export default CommitCommand
