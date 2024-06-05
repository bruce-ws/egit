import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import InquirerService from '@/service/inquirerService'
import { RabaseType } from '@/utils/configData'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class DrcCommand {
  createCommand(): Command {
    return new Command('deal-rebase-clash')
      .alias('drc')
      .description('解决rebase冲突，执行rebase continue')
      .action(async () => {
        const gitInvoker = new GitInvoker()
        // 询问执行 continue 还是 abort
        const cmType = await InquirerService.select('选择rebase处理方案:', RabaseType)
        if (!cmType) return
        if (cmType === '--continue') {
          const _addInfo = await gitInvoker.executeCmd('add', {})
          if (!_addInfo || !checkExecaInfoNoError(_addInfo)) return
          outputRes('[add] 文件添加至暂存区成功，继续Rebase')
          const _rebaseInfo = await gitInvoker.executeCmd('rebase', { continue: true })
          if (!_rebaseInfo || !checkExecaInfoNoError(_rebaseInfo)) return
          outputRes('[rebase] Rebase continue 成功')
        }
        if (cmType === '--abort') {
          const _rebaseInfo = await gitInvoker.executeCmd('rebase', { abort: true })
          if (!_rebaseInfo || !checkExecaInfoNoError(_rebaseInfo)) return
          outputRes('[rebase] Rebase abort 成功，当前分支回到初始状态')
        }
      })
  }
}

export default DrcCommand
