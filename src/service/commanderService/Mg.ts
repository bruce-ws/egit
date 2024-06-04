import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class MgCommand {
  createCommand(): Command {
    return new Command('merge')
      .alias('mg')
      .argument('<branch>', '要合并的分支')
      .action(async (branchName: string) => {
        const gitInvoker = new GitInvoker()
        const _mergeInfo = await gitInvoker.executeCmd('merge', { branchName })
        if (!_mergeInfo || !checkExecaInfoNoError(_mergeInfo)) return
        outputRes('合并完成')
      })
  }
}

export default MgCommand
