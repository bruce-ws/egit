import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class DdCommand {
  createCommand(): Command {
    return new Command('d')
      .description('删除分支')
      .argument('branch', '要删除的分支')
      .action(async (branchName: string) => {
        const gitInvoker = new GitInvoker()
        const _branchInfo = await gitInvoker.executeCmd('branch', {
          force: false,
          branchName,
        })
        if (!_branchInfo || !checkExecaInfoNoError(_branchInfo)) return
        outputRes(_branchInfo.stdout, 46, false)
      })
  }
}
