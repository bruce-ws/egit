export const COMMITTYPE = [
  { name: 'feat: 新功能', value: 'feat: ' },
  { name: 'fix: 修补Bug', value: 'fix: ' },
  { name: 'docs: 文档类', value: 'docs: ' },
  { name: 'style: 格式类，不涉及到逻辑', value: 'style: ' },
  { name: 'refactor: 代码重构', value: 'refactor: ' },
  { name: 'perf: 优化相关', value: 'perf: ' },
  { name: 'test: 测试用例，包括单元测试、集成测试等', value: 'test: ' },
  { name: 'chore: 改变构建流程、或者增加依赖库、工具等', value: 'chore: ' },
  { name: 'revert: 版本回滚', value: 'revert:' },
]

export const RabaseType = [
  { name: 'continue：手动解决冲突后继续Rebase', value: '--continue' },
  // { name: 'skip：手动解决冲突后跳过当前提交', value: '--skip' },
  { name: 'abort：不执行Rebase，回到之前状态', value: '--abort' },
]
