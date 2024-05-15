// egit.ts
import { Command } from 'commander'
import CmCommand from './Cm'
export class Egit {
  private program: Command

  constructor() {
    this.program = new Command()
    this.program.name('egit').description('EGit，一个面向团队的git管理工具')
    console.log(
      'Commands configured:',
      this.program.commands.map((c) => c.name()),
    )
  }

  public initialize(): void {
    this.configureCommands()
    this.program.parseAsync(process.argv).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  }

  private configureCommands(): void {
    this.program.addCommand(new CmCommand().createCommand())
  }
}
export default Egit
