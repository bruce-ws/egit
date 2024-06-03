import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
// import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class RbCommand {
  createCommand(): Command {
    return new Command('rebase')
      .alias('rb')
      .description('变基处理：强烈建议不要在公共分支处理变基操作')
      .argument('<branch>', '要删除的分支')
      .action(async (branchName: string) => {
        const gitInvoker = new GitInvoker()
        const _fetchInfo = await gitInvoker.executeCmd('fetch', {
          branch: branchName,
        })
        console.log(_fetchInfo, '-fetch------')
      })
  }
}

export default RbCommand
