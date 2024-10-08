### egit命令介绍
```
egit是一个git辅助性工具，并不意图取代git，只是对git流程简单做了一层封装，仍然需要git强大的功能依赖。
意图：简化git繁琐的切分支、commit信息混乱等问题。
```
egit初版
1. 解决git的commit规范问题
2. 解决rebase分支管理问题
3. 解决git checkout 分支问题【选项式】
4. 以下是egit执行逻辑
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
  > y : git push

```
```
$ egit push | ps
  > 自动执行 git pull
  > 检测是否有冲突
  > 如果有冲突 则 拦下当前处理 修复
  ------  如果有冲突 修复完成
    > $ egit cm
  ------ 
  > 如果没冲突 则 git push
```

```
$ egit pull | pu
  > 自动执行 git pull
```

```
$ egit rebase|rb 公共分支
  > 执行变基【在自己的开发分支处理变基，从最新[远端]公共分支拉取】
  > 注：强烈建议不要在公共分支上使用rebase,
  > 例如：当前分支为feat/v1.2.0-01
  > 执行 egit rb feat/v1.2.0 [把当前分支变基到公共分支 feat/v1.2.0]
  > 逻辑处理【不明确地方：feat/v1.2.0 是否已经是最新状态】
  > 因上述不明确原因: 先同步远端feat/v1.2.0分支到本地的feat/v1.2.0分支到本地
    ---- 所有要先同步一下公共分支上的代码
      > $ git fetch origin feat/v1.2.0
    ----
  > 此时可以 执行
    ---- rebase
      > $ git rebase origin/feat/v1.2.0
    ----
  > 在当前的feat/v1.2.0-01分支检查冲突
  > 如果有冲突 则 拦下当前处理 修复   
    ------  如果有冲突
      > $ egit deal clash
    ------ 
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

$ egit ckb .
  放弃所有更改
```

```
$ egit d branch
  > 删除
  > -f 强制删除
```

```
$ egit deal-rebase-clash
  > 当分支 rebase冲突解决完毕时使用
  > 解决完冲突直接运行当前命令
  > 逻辑执行 git add .
  > 逻辑执行 git rebase --continue
  > 如果仍然冲突则继续修复 然后 $ egit drc
  > 如果没有冲突则执行 git push完成提交
```
