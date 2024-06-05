import { type ExecaReturnValue } from 'execa'
import clc from 'cli-color'

export const checkExecaInfoNoError = (info: ExecaReturnValue) => {
  if (info.failed || info.killed || info.timedOut || info.isCanceled) {
    return false
  }
  return true
}

export const outputText = () => {
  const msg = clc.xterm(93)
  const msg1 = clc.xterm(92)
  const msg2 = clc.xterm(91)
  const msg3 = clc.xterm(90)
  const msg4 = clc.xterm(89)
  console.log(msg('\n0000000  000000   00 00000000'))
  console.log(msg1('00      00        00    00    '))
  console.log(msg2('00000   00   000  00    00    '))
  console.log(msg3('00      00    00  00    00    '))
  console.log(msg4('0000000  000000   00    00      \n'))
  outputRes('----------------------------------------------------------------------------', 89)
  outputRes('EGit，一个简易的git管理工具，拥抱敏捷开发😉', 89)
  outputRes('     用法:', 89)
  outputRes('       命令:', 89)
  outputRes('           checkout | ckb  ❤❤ 提供交互选择切换分支 ❤❤', 89)
  outputRes('             commit | cm   ❤❤ 包含了 add commit 以及 push 功能，并优化commit规范 ❤❤', 89)
  outputRes('         del-branch | d    ❤❤ 删除本地分支 ❤❤', 89)
  outputRes('  deal-rebase-clash | drc  ❤❤ 解决rebase冲突后的执行流程 ❤❤', 89)
  outputRes('              merge | mg   ❤❤ 合并分支 ❤❤', 89)
  outputRes('               push | p    ❤❤ 推送本地分支到远程仓库，自动pull最新代码 ❤❤', 89)
  outputRes('             rebase | rb   ❤❤ 变基处理，自动Fetch远端代码并自动merge ❤❤', 89)
  outputRes('----------------------------------------------------------------------------', 89)
}

/**
 * outputRes 输出命令反馈
 * @msg 命令反馈
 */
export const outputRes = (msg: string, _color: number = 46, isBr: boolean = true) => {
  const _colorText = clc.xterm(_color)
  isBr ? console.log(`${_colorText(msg)}\n`) : console.log(`${_colorText(msg)}`)
}

/**
 * 构建分支选取
 */
export const buildBranchOptions = (branch: string) => {
  const branchs = branch.split('\n')
  return branchs.map((item: string) => {
    return {
      name: item,
      value: item,
    }
  })
}
