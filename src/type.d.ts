/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ExecaReturnValue } from 'execa'
/**
 * 抽象命令class
 */
export interface IGitCommand<T = any> {
  execute: (options?: T) => Promise<ExecaReturnValue<string>>
  // undo?(): Promise<void> // 可选的撤销操作
}
/**
 * 创建分支options
 */
export interface ICreateBranchOptions {
  branchName: string
  fromBranch?: string
}
/**
 * 删除分支options
 */
export interface IDeleteBranchOptions {
  branchName: string
  force?: boolean
}
/**
 * 查看分支
 */
interface IViewLocalBranchOptions {
  all: boolean
}
/**
 * 命令调用集合
 */
export interface ICMDInvoke {
  /**
   * 命令集合
   */
  executeCmd: (commandName: string, options: any) => Promise<ExecaReturnValue<string> | undefined>
}
