import { Command } from 'commander'
import add from './commands/add'

const program = new Command()
program
  .command('egit')
  .description('Add files to staging area')
  .action((files: string[]) => add({ files })) // 假设gitAdd函数接受一个字符串数组作为参数

program.parse()
