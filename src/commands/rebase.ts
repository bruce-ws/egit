import { execa } from 'execa'
import { type IGitCommand } from '@/type'

interface IRebaseOptions {
  branch?: string
  continue?: boolean
  abort?: boolean
}

class RebaseCommand implements IGitCommand {
  public branch?: string
  public shouldContinue?: boolean
  public shouldAbort?: boolean

  constructor(options: IRebaseOptions) {
    this.branch = options.branch
    this.shouldContinue = options.continue
    this.shouldAbort = options.abort
  }

  private validateOptions(): void {
    const actionCount = [this.branch !== undefined, this.shouldContinue, this.shouldAbort].filter(Boolean).length

    if (actionCount !== 1) {
      throw new Error('请指定一个操作：branch进行rebase，或--continue，或--abort')
    }
  }

  async execute(): Promise<void> {
    this.validateOptions()

    let args: string[] = []

    if (this.shouldContinue) {
      args = ['rebase', '--continue']
    } else if (this.shouldAbort) {
      args = ['rebase', '--abort']
    } else if (this.branch) {
      args = ['rebase', this.branch]
    }

    try {
      await execa('git', args)
    } catch (error: unknown) {
      if (error instanceof Error) {
        let errorMessage = '执行rebase时出错:'
        if (this.shouldContinue) errorMessage += ' 继续rebase'
        else if (this.shouldAbort) errorMessage += ' 中止rebase'
        else errorMessage += ` 到分支[${this.branch}]`

        errorMessage += ` [git ${args.join(' ')}]: ${error.message}`
        console.error(errorMessage)
      }
      throw error
    }
  }
}

export default RebaseCommand
