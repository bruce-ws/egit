// commit-command.ts
import { Command } from 'commander'

export default class CmCommand {
  createCommand(): Command {
    const command = new Command('cm')
      .description('创建带有消息的提交')
      .argument('<message>', '提交消息')
      .action((message) => {
        console.log(`创建带有消息的提交: "${message}"`)
      })
    return command
  }
}
