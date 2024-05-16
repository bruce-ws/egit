// commit-command.ts
import { Command } from 'commander'
import { COMMITTYPE } from '@/utils/configData'
import InquirerService from '@/service/inquirerService'
import GitInvoker from '@/CMDInvoke/index'
export default class CmCommand {
  createCommand(): Command {
    const command = new Command('cm')
      .description('创建带有消息的提交Commit')
      .argument('message', '提交信息')
      .action(async (message) => {
        const cmType = await InquirerService.select('选择提交类型:', COMMITTYPE)
        const gitInvoker = new GitInvoker()
        await gitInvoker.executeCmd('add', {})
        await gitInvoker.executeCmd('commit', {
          msg: cmType + message,
        })
      })
    return command
  }
}
