import { type ExecaReturnValue } from 'execa'
export const checkExecaInfoNoError = (info: ExecaReturnValue) => {
  if (info.failed || info.killed || info.timedOut || info.isCanceled) {
    return false
  }
  return true
}
