import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import { checkExecaInfoNoError, outputRes } from '@/utils/index'
export class PUSHCommand {
  createCommand(): Command {
    return new Command('push')
      .alias('ps')
      .description('处理pull之后会进入push阶段')
      .action(async () => {
        const gitInvoker = new GitInvoker()
        const _pullInfo = await gitInvoker.executeCmd('pull', {})
        if (!_pullInfo || !checkExecaInfoNoError(_pullInfo)) return
        outputRes(`[pull] ${_pullInfo.stdout} 进入推送阶段。`)
        const _pushInfo = await gitInvoker.executeCmd('push', {})
        if (!_pushInfo || !checkExecaInfoNoError(_pushInfo)) return
        const _pushMsg = _pushInfo.stdout || _pushInfo.stderr
        outputRes(`[push] ${_pushMsg} ！ready ！`)
      })
  }
}

export default PUSHCommand
