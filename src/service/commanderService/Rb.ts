import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class RbCommand {
  createCommand(): Command {
    return new Command('rebase')
      .alias('rb')
      .description('变基处理：强烈建议不要在公共分支处理变基操作')
      .argument('<branch>', '要删除的分支')
      .action(async (branchName: string) => {
        const gitInvoker = new GitInvoker()
        // 1：拉取远端最新代码
        outputRes(`开始拉取 ${branchName} 分支远端最新代码`, 51)
        const _fetchInfo = await gitInvoker.executeCmd('fetch', {
          branch: branchName,
        })
        if (!_fetchInfo || !checkExecaInfoNoError(_fetchInfo)) return
        outputRes(`拉取远端代码成功，开始执行变基操作`, 51)
        // 2: 开始执行变基操作 注：是基于 origin/branchName 非本地branchName分支
        const _rebaseInfo = await gitInvoker.executeCmd('rebase', {
          branch: `origin/${branchName}`,
        })
        if (!_rebaseInfo || !checkExecaInfoNoError(_rebaseInfo)) return
        console.log(_rebaseInfo, 'rebase-info')
      })
  }
}

export default RbCommand
