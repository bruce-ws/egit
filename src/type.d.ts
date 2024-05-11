/* eslint-disable @typescript-eslint/no-explicit-any */
// 抽象命令
export interface IGitCommand {
  execute: () => Promise<void>
  // undo?(): Promise<void> // 可选的撤销操作
}

// 调用
export interface ICMDInvoke {
  /**
   * 命令集合
   */
  executeCmd: (commandName: string, options: any) => Promise<void>
}
