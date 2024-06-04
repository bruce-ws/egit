import { execa } from 'execa'
import { type IGitCommand } from '@/type'
import { outputRes } from '@/utils/index'

interface ILogOptions {
  // 可以添加额外的选项，如数量限制、作者筛选等
  limit?: number
  author?: string
}

class LogCommand implements IGitCommand<ILogOptions> {
  public options: ILogOptions | undefined

  constructor(options?: ILogOptions) {
    this.options = options
  }

  async execute() {
    try {
      const args: string[] = ['log']

      // 根据选项添加参数
      if (this.options?.limit) {
        args.push(`-${this.options.limit}`)
      }
      if (this.options?.author) {
        args.push(`--author=${this.options.author}`)
      }
      const _res = await execa('git', args)
      console.log(_res.stdout)
      return _res
    } catch (error: unknown) {
      if (error instanceof Error) {
        outputRes(`获取日志出错[git log]: ${error.message}`, 124)
      }
      throw error
    }
  }
}

export default LogCommand
