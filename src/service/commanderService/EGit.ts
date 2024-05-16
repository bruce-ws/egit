// egit.ts
import { Command } from 'commander'
import CmCommand from './Cm'
import PushCommand from './Push'
export class Egit {
  private program: Command

  constructor() {
    this.program = new Command()
    this.program.name('EGit').description('EGit，一个面向团队的git管理工具')
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
    this.program.addCommand(new PushCommand().createCommand())
  }
}
export default Egit
