import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class DelCommand {
  createCommand(): Command {
    return new Command('del-branch')
      .alias('d')
      .description('删除分支')
      .argument('<branch>', '要删除的分支')
      .option('-f, --force', '强制删除分支 (忽略警告)', false)
      .action(async (branchName: string, options: { force: boolean }) => {
        const gitInvoker = new GitInvoker()
        const _branchInfo = await gitInvoker.executeCmd('branch', {
          force: options.force,
          branchName,
        })
        if (!_branchInfo || !checkExecaInfoNoError(_branchInfo)) return
        outputRes(_branchInfo.stdout, 46, false)
      })
  }
}

export default DelCommand
