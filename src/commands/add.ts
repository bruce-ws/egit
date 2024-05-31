import { execa, type ExecaReturnValue } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'

interface IAddOptions {
  files?: string[]
}
class AddCommand implements IGitCommand {
  public files: string[]

  constructor(options: IAddOptions) {
    this.files = options.files || []
  }

  async execute(): Promise<ExecaReturnValue<string>> {
    try {
      const args = this.files.length > 0 ? this.files : ['-A']
      return await execa('git', ['add', ...args])
    } catch (error: unknown) {
      if (error instanceof Error) outputRes(`向暂存区添加更改时出错[git add]: ${error.message}`, 124)
      throw error
    }
  }
}

export default AddCommand
