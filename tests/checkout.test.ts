import { jest, expect } from '@jest/globals'
import CheckoutCommad from '@/commands/checkout'
import { execa } from 'execa' // 注意：在实际测试环境中，可能需要使用mock来替代真实执行git命令
import { outputRes as mockOutputRes } from '@/utils/index'
jest.mock('execa')
jest.mock('@/utils/index', () => ({
  outputRes: jest.fn(), // mock outputRes函数
}))
describe('CheckoutCommad', () => {
  let checkoutCommad: CheckoutCommad

  beforeEach(() => {
    checkoutCommad = new CheckoutCommad('branchName')
  })

  it('IGitCommand的一个实例', () => {
    expect(checkoutCommad).toBeInstanceOf(CheckoutCommad)
  })

  it('执行git checkout命令', async () => {
    await checkoutCommad.execute()
    expect(execa).toHaveReturnedTimes(1)
    expect(execa).toHaveBeenCalledWith('git', ['checkout', 'branchName'])
  })

  it('处理git checkout执行过程中的错误', async () => {
    const originalError = console.error
    console.error = jest.fn()
    const errorMessage = 'Git checkout failed'
    ;(execa as jest.Mock).mockRejectedValue(new Error(errorMessage) as never)
    const branchName = 'branchName'
    const addCmd = new CheckoutCommad(branchName)
    await expect(addCmd.execute()).rejects.toThrow(`${errorMessage}`)
    expect(mockOutputRes).toHaveBeenCalledWith(
      `切换分支或恢复操作出错[git checkout: ${branchName}] ${errorMessage}`,
      124,
    )
    console.error = originalError
  })
})
