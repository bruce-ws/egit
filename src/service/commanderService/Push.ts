import { Command } from 'commander'

export class PUSHCommand {
  createCommand(): Command {
    return new Command('push').description('push').action(() => {
      console.log('push---')
    })
  }
}

export default PUSHCommand
