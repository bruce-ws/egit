/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander'
import inquirer from 'inquirer'
import { $ } from 'execa'

const program = new Command()
program
  .command('egit')
  // .description('EGit 一个面向团队的git管理工具')
  // .action((files: string[]) => add({ files })) // 假设gitAdd函数接受一个字符串数组作为参数
  .action(async () => {
    const res = await $`git branch -a`
    console.log(res.stdout, 'wangshuai--')
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'theme',
          message: 'What do you want to do?',
          choices: [...res.stdout.split('\n')],
        },
        {
          type: 'list',
          name: 'size',
          message: 'What size do you need?',
          choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
          filter(val) {
            return val.toLowerCase()
          },
        },
      ])
      .then((answers) => {
        console.log(answers, '当前选择')
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      })
  })

program.parse(process.argv)
