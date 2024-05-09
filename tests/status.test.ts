import { jest, expect } from '@jest/globals'
import StatusCommad from '@/commands/status'
import { execa } from 'execa' // 注意：在实际测试环境中，可能需要使用mock来替代真实执行git命令
jest.mock('execa')

describe('StatusCommad', () => {
  let statusCommad: StatusCommad

  beforeEach(() => {
    statusCommad = new StatusCommad()
  })

  it('IGitCommand的一个实例', () => {
    expect(statusCommad).toBeInstanceOf(StatusCommad)
  })

  it('处理git status执行过程中的错误', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const errorMessage = 'Git status failed'
    ;(execa as jest.Mock).mockRejectedValue(new Error(errorMessage) as never)

    const addCmd = new StatusCommad()
    await expect(addCmd.execute()).rejects.toThrow(`${errorMessage}`)
    expect(console.error).toHaveBeenCalledWith(`状态查询出错[git status]: ${errorMessage}`)
    console.error = originalError
  })
})
