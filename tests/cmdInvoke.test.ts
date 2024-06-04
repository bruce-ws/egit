/* eslint-disable @typescript-eslint/no-explicit-any */
// gitInvoker.test.ts
import GitInvoker from '@/CMDInvoke/index'
describe('GitInvoker', () => {
  let invoker: GitInvoker

  beforeEach(() => {
    invoker = new GitInvoker()
  })

  it('registers all commands correctly', () => {
    // console.log((invoker as any).commands)
    expect((invoker as any).commands.size).toBe(9)
  })
})
