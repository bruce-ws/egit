/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGitCommand, ICMDInvoke } from '@/type'
import CommitCommand from '@/commands/commit'
import AddCommand from '@/commands/add'
import CheckoutCommand from '@/commands/checkout'
import PullCommand from '@/commands/pull'
import RebaseCommand from '@/commands/rebase'
import StatusCommand from '@/commands/status'
import BranchCommand from '@/commands/branch'

type GitCommandConstructor = new (...args: any[]) => IGitCommand

class GitInvoker implements ICMDInvoke {
  private commands: Map<string, GitCommandConstructor>
  constructor() {
    this.commands = new Map()
    // 所有命令
    this.registerCommands([
      CommitCommand,
      AddCommand,
      CheckoutCommand,
      PullCommand,
      RebaseCommand,
      StatusCommand,
      BranchCommand,
    ])
  }

  // 使用定义的类型别名来约束commandClasses参数，存储构造函数而不是实例
  private registerCommands(commandClasses: GitCommandConstructor[]): void {
    for (const CommandClass of commandClasses) {
      const commandName = CommandClass.name?.replace('Command', '')?.toLowerCase()
      this.commands.set(commandName, CommandClass)
    }
  }

  async executeCmd(commandName: string, args: any): Promise<void> {
    const CommandClass = this.commands.get(commandName)
    if (!CommandClass) {
      console.warn(`未知的Git命令: ${commandName}`)
      return
    }

    try {
      const commandInstance = new CommandClass(args)
      await commandInstance.execute()
      console.log(`${commandName} 命令执行成功`)
    } catch (error) {
      console.error(`${commandName} 命令执行时出错:`, error)
    }
  }
}

export default GitInvoker
