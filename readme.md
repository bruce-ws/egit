### egit命令介绍
```
egit是一个git辅助性工具，并不意图取代git，只是对git流程做了一层封装，仍然需要git强大的功能依赖。
目的：简化git繁琐的切分支、commit信息混乱等问题。
```
egit初版
1. 解决git的commit规范问题
2. 解决rebase分支管理问题
3. 解决git checkout 分支问题【选项式】

```
$ egit cm

  > 逻辑执行 git add -A  | git add .
  > 输出添加信息 add msg
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
  eg:   feat: 提交新功能commit msg

  > 询问是否需要push 到远程分支 [y/n]
  > y : egit push

```
```
$ egit push
  > 自动执行 git pull --rebase [当前分支变基]
  > 检测是否有冲突
  > 如果有冲突 则 拦下当前处理 修复
  ------  如果有冲突 修复完成
    > $ egit deal clash
  ------ 
  > 如果没冲突 则 git push
```
```
$ egit rebase2 xxx
  > 执行变基
  > 例如 当前分支为 feat/a 
  > 执行 egit rebase2 release/dev
  > 逻辑执行 git checkout release/dev
  > 逻辑执行 git pull --rebase
  > 逻辑执行 git rebase feat/a

  > 检测有没有冲突 
  > 如果有冲突 则 拦下当前处理 修复   
  ------  如果有冲突
    > $ egit deal clash
  ------ 

  > 如果没有冲突直接执行下面逻辑
  > 当前分支 release/dev
  > 执行逻辑 git push
  > 逻辑执行 再自动切回到feat/a分支 方便合并到其他分支
```
```
$ egit ckb
  > 自动执行 git branch
  > 选择分支
  > 分支 
    > feat/v1.2.0
      release/dev
      release/test
      release/prod
      ....
  > 逻辑执行 git checkout xxx分支
```
```
$ egit deal clash
  > 当分支 rebase冲突解决完毕时使用
  > 解决完冲突直接运行当前命令
  > 逻辑执行 git add .
  > 逻辑执行 git rebase --continue
  > 如果仍然冲突则继续修复 然后 $ egit deal clash
  > 如果没有冲突则执行 git push完成提交
```
