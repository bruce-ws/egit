// egit.ts
import { Command } from 'commander'
import CMCommand from './Cm'
import PUSHCommand from './Push'
import CKBCommand from './Ckb'
import { outputText } from '@/utils/index'
export class Egit {
  private program: Command

  constructor() {
    this.program = new Command()
    this.program
      .name('EGit')
      .description('EGit，一个面向团队的git管理工具')
      .action(() => outputText())
  }

  public initialize(): void {
    this.configureCommands()
    this.program.parseAsync(process.argv).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  }

  private configureCommands(): void {
    this.program.addCommand(new CMCommand().createCommand())
    this.program.addCommand(new PUSHCommand().createCommand())
    this.program.addCommand(new CKBCommand().createCommand())
  }
}
export default Egit
