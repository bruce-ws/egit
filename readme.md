### egit命令介绍

egit初版
1. 解决git的commit规范问题
2. 解决rebase分支管理问题【feature分支 release分支】
3. 解决git checkout 分支问题【选项式】

```
$ egit cm

  自动 git add -A  | git add .

  output add msg

  > 进入commit阶段 开始编辑 commit message 
  > 选择 commit信息类型

  > feat: 新功能（feature）
    fix: 修补 bug
    docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等等
    style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
    refactor: 代码重构，没有加新功能或者修复 BUG
    perf: 优化相关，比如提升性能、体验
    test: 测试用例，包括单元测试、集成测试等
    chore: 改变构建流程、或者增加依赖库、工具等
    revert: 回滚到上一个版本

  feat: 提交新功能commit msg



$ egit push
  > 自动执行 git pull --rebase [当前分支变基]
  > 检测是否有冲突
  > 修复冲突
  > 继续执行 $ egit cm命令
  > 执行egit push


$ egit ckb
  > 自动执行 git branch
  > 选择分支
  > 分支 [main分支不在当前合并范围 main/master等主干分支需要单独 merge  '留存merge信息']
    > feat/v1.2.0
      release/dev
      release/test
      release/prod
      ....

  > 选择分支过后

    > 
```

