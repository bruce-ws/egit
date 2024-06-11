import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class PuCommand {
  createCommand(): Command {
    return new Command('pull')
      .alias('pu')
      .description('Pull拉取代码')
      .action(async () => {
        const gitInvoker = new GitInvoker()
        const _pullInfo = await gitInvoker.executeCmd('pull', {})
        if (!_pullInfo || !checkExecaInfoNoError(_pullInfo)) return
        outputRes('[pull]拉取完成', 46, false)
      })
  }
}

export default PuCommand
