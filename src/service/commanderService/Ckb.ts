import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import InquirerService from '@/service/inquirerService'
import { checkExecaInfoNoError, outputRes, pullLocalBranch } from '@/utils/index'
export class CKBCommand {
  createCommand(): Command {
    return new Command('checkout')
      .alias('ckb')
      .description('选择性切换分支')
      .action(async () => {
        const gitInvoker = new GitInvoker()
        // 放弃所有修改
        if (process.argv.length === 4 && process.argv[3] === '.') {
          const checkoutInfo = await gitInvoker.executeCmd('checkout', '.')
          if (!checkoutInfo || !checkExecaInfoNoError(checkoutInfo)) return
          outputRes(checkoutInfo.stderr + ' — 放弃所有修改', 46, false)
          return
        }
        const _branch = await pullLocalBranch('切换')
        if (_branch.includes('*')) {
          outputRes(`已在当前分支 ${_branch}`, 120, false)
          return
        }
        const _checkoutInfo = await gitInvoker.executeCmd('checkout', _branch.replaceAll(' ', ''))
        if (!_checkoutInfo || !checkExecaInfoNoError(_checkoutInfo)) return
        outputRes(_checkoutInfo.stderr, 46, false)
        const choosePull = await InquirerService.confirm('是否拉取当前远端最新代码?', true)
        if (choosePull) {
          const _pullInfo = await gitInvoker.executeCmd('pull', {})
          if (!_pullInfo || !checkExecaInfoNoError(_pullInfo)) return
          outputRes('[pull]拉取完成', 46, false)
        } else {
          outputRes('未拉取远端代码，请自行处理', 46, false)
        }
      })
  }
}

export default CKBCommand
