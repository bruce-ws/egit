// 抽象命令
export interface IGitCommand {
  execute(): Promise<void>
  // undo?(): Promise<void> // 可选的撤销操作
}
