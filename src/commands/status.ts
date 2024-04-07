/* eslint-disable @typescript-eslint/no-explicit-any */
import { execa } from 'execa'
async function status(): Promise<void> {
  try {
    const res = await execa('git', ['status'])
    console.log(res)
  } catch (error: any) {
    console.error(`状态查询出错[git status]: ${error.message}`)
    throw error
  }
}

export default status
