// commit-command.ts
import { Command } from 'commander'
import { COMMITTYPE } from '@/utils/configData'
import InquirerService from '@/service/inquirerService'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export default class CMCommand {
  public createCommand(): Command {
    const command = new Command('commit')
      .alias('cm')
      .description('创建带有消息的提交Commit')
      .argument('message', '提交信息')
      .action(async (message) => {
        const cmType = await InquirerService.select('选择提交类型:', COMMITTYPE)
        const gitInvoker = new GitInvoker()
        const _addInfo = await gitInvoker.executeCmd('add', {})
        if (!_addInfo || !checkExecaInfoNoError(_addInfo)) return
        outputRes('[add] 文件添加至暂存区成功')
        const _cmInfo = await gitInvoker.executeCmd('commit', {
          msg: cmType + message,
        })
        if (!_cmInfo || !checkExecaInfoNoError(_cmInfo)) return
        outputRes('[commit] 本地仓库提交信息成功')
        const choosePush = await InquirerService.confirm('是否推送到远端分支?', true)
        if (choosePush) {
          const _pushRes = await gitInvoker.executeCmd('push', {})
          if (!_pushRes || !checkExecaInfoNoError(_pushRes)) return
          outputRes('[push] 推送到远端仓库成功')
        } else {
          console.log('未推送到远端仓库，请自行处理')
        }
      })
    return command
  }
}
