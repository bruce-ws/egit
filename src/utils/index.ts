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
  console.log(msg('\n███████  ██████   ██ ████████'))
  console.log(msg1('██      ██        ██    ██    '))
  console.log(msg2('█████   ██   ███  ██    ██    '))
  console.log(msg3('██      ██    ██  ██    ██    '))
  console.log(msg4('███████  ██████   ██    ██      \n'))
}

/**
 * outputRes 输出命令反馈
 * @msg 命令反馈
 */
export const outputRes = (msg: string, _color: number = 50) => {
  const _colorText = clc.xterm(_color)
  console.log(_colorText(msg))
}
