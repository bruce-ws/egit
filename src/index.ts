/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander'

const program = new Command()
program
  .command('egit [environment]')
  .description('EGit 一个面向团队的git管理工具')
  .action(() => {
    program.command('cm').action((e) => {
      console.log(e, 'wangshuai---')
    })
  })

program.parse(process.argv)
