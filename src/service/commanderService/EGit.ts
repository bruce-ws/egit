// egit.ts
import { Command } from 'commander'
import CMCommand from './Cm'
import PUSHCommand from './Push'
import CKBCommand from './Ckb'
import DelCommand from './Del'
import RbCommand from './Rb'
import MrCommand from './Mg'
import DrcCommand from './Drc'
import PuCommand from './Pu'
import { outputText, outputRes } from '@/utils/index'

export class Egit {
  private program: Command

  constructor() {
    this.program = new Command()
    this.program
      .name('EGit')
      .description('EGit，一个简易的git管理工具，拥抱敏捷开发😉')
      .option('-v', '1.0.4')
      .action((options) => {
        if (options.v) {
          outputRes(`\nEGit version：${'1.0.4'}`, 204)
        } else {
          outputText()
        }
      })
  }

  public initialize(): void {
    this.configureCommands()
    const commandName = process.argv[1].split('/').pop()
    if (commandName === 'eg' || commandName === 'egit') {
      this.program.name(commandName)
    }
    this.program.parseAsync(process.argv).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  }

  private configureCommands(): void {
    this.program.addCommand(new CMCommand().createCommand())
    this.program.addCommand(new PUSHCommand().createCommand())
    this.program.addCommand(new CKBCommand().createCommand())
    this.program.addCommand(new DelCommand().createCommand())
    this.program.addCommand(new RbCommand().createCommand())
    this.program.addCommand(new MrCommand().createCommand())
    this.program.addCommand(new DrcCommand().createCommand())
    this.program.addCommand(new PuCommand().createCommand())
  }
}
export default Egit
