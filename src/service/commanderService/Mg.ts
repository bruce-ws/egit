import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes, pullLocalBranch } from '@/utils/index'
export class MgCommand {
  createCommand(): Command {
    return new Command('merge').alias('mg').action(async () => {
      const gitInvoker = new GitInvoker()
      const branchName = await pullLocalBranch('合并')
      if (branchName.includes('*')) {
        outputRes(`请选择其他分支进行merge`, 120, false)
        return
      }
      const _mergeInfo = await gitInvoker.executeCmd('merge', { branchName: branchName.replaceAll(' ', '') })
      if (!_mergeInfo || !checkExecaInfoNoError(_mergeInfo)) return
      outputRes('合并完成')
    })
  }
}

export default MgCommand
