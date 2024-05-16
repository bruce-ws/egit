// commit-command.ts
import { Command } from 'commander'
import { COMMITTYPE } from '@/utils/configData'
import InquirerService from '@/service/inquirerService'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError } from '@/utils/index'
export default class CmCommand {
  public createCommand(): Command {
    const command = new Command('cm')
      .description('创建带有消息的提交Commit')
      .argument('message', '提交信息')
      .action(async (message) => {
        const cmType = await InquirerService.select('选择提交类型:', COMMITTYPE)
        const gitInvoker = new GitInvoker()
        const _addInfo = await gitInvoker.executeCmd('add', {})
        if (!_addInfo || !checkExecaInfoNoError(_addInfo)) return
        const _cmInfo = await gitInvoker.executeCmd('commit', {
          msg: cmType + message,
        })
        if (!_cmInfo || !checkExecaInfoNoError(_cmInfo)) return
        const choosePush = await InquirerService.confirm('是否推送到远端分支?', true)
        console.log(choosePush, '选择推送----')
      })
    return command
  }
}
