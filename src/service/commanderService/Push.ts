import { Command } from 'commander'
import clc from 'cli-color'

export class PUSHCommand {
  createCommand(): Command {
    return new Command('push').description('push').action(() => {
      const msg = clc.xterm(92).bgXterm(236)
      console.log(msg('Orange text on dark gray background'))
    })
  }
}

export default PUSHCommand
