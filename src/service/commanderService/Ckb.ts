import { Command } from 'commander'
import GitInvoker from '@/CMDInvoke/index'
import InquirerService from '@/service/inquirerService'
import { checkExecaInfoNoError, outputRes, buildBranchOptions } from '@/utils/index'
export class CKBCommand {
  createCommand(): Command {
    return new Command('ckb').description('选择性切换分支').action(async () => {
      const gitInvoker = new GitInvoker()
      // 放弃所有修改
      console.log(process.argv)
      if (process.argv.length === 4 && process.argv[3] === '.') {
        const checkoutInfo = await gitInvoker.executeCmd('checkout', '.')
        if (!checkoutInfo || !checkExecaInfoNoError(checkoutInfo)) return
        outputRes(checkoutInfo.stderr + ' — 放弃所有修改', 46, false)
        return
      }

      // 拉取分支【本地分支】
      const _branchInfo = await gitInvoker.executeCmd('branch', {})
      // 构建分支选取options
      if (_branchInfo && checkExecaInfoNoError(_branchInfo)) {
        const _branchs = buildBranchOptions(_branchInfo.stdout)
        const selectBranch = await InquirerService.select('选择切换的分支:', _branchs)
        if (selectBranch.includes('*')) {
          outputRes(`已在当前分支 ${selectBranch}`, 120, false)
          return
        }
        const _checkoutInfo = await gitInvoker.executeCmd('checkout', selectBranch.replaceAll(' ', ''))
        if (!_checkoutInfo || !checkExecaInfoNoError(_checkoutInfo)) return
        outputRes(_checkoutInfo.stderr, 46, false)
      } else {
        outputRes('拉取分支失败', 124, false)
      }
    })
  }
}

export default CKBCommand
