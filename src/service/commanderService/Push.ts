import { Command } from 'commander'

export class PushCommand {
  createCommand(): Command {
    return new Command('push').description('push').action(() => {
      console.log('push---')
    })
  }
}

export default PushCommand
