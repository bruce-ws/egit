/* eslint-disable @typescript-eslint/no-explicit-any */
import { execa } from 'execa'

interface AddOptions {
  files?: string[]
}

/**
 * 通过向暂存区添加更改来简化git添加过程.
 * @param {AddOptions} options - options对象，其中包含要暂存的文件列表。如果未提供，则分级所有更改(-A)。
 * @returns {Promise<void>} 解析git add命令何时成功执行。
 */
async function add(options: AddOptions = {}): Promise<void> {
  const { files = [] } = options

  const args = files.length > 0 ? files : ['-A']
  try {
    console.log(`向暂存区添加更改: ${args}, ${options}`)
    await execa('git', ['add', ...args])
  } catch (error: any) {
    console.error(`向暂存区添加更改时候出错[git add]: ${error.message}`)
    throw error
  }
}

export default add
