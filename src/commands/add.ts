import { execa } from 'execa'
import { type IGitCommand } from '@/type'

interface IAddOptions {
  files?: string[]
}
class AddCommad implements IGitCommand {
  private files: string[]

  constructor(options: IAddOptions) {
    this.files = options.files || []
  }

  async execute(): Promise<void> {
    try {
      const args = this.files.length > 0 ? this.files : ['-A']
      await execa('git', ['add', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) console.error(`向暂存区添加更改时出错[git add]: ${error.message}`)
      throw error
    }
  }
}

export default AddCommad
