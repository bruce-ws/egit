/* eslint-disable @typescript-eslint/no-explicit-any */
import inquirer from 'inquirer'

interface Question {
  type?: string
  name: string
  message: string
  default?: any
  // 基于问题类型的任何其他有效类型
  choices?: string[]
  validate?: (input: any) => boolean | string
}

export class InquirerService {
  /**
   * 用一组问题提示用户并返回答案。
   * @param questions 提示用户的问题数据 Array<Question>
   */
  public static async prompt(questions: Question[]): Promise<any> {
    try {
      const answers = await inquirer.prompt(questions)
      return answers
    } catch (error) {
      console.error('用户输入时出现错误:', error)
      throw error
    }
  }

  /**
   * 询问一个确认问题。
   * @param message 问题描述.
   * @param defaultValue 确认信息的默认值.
   */
  public static async confirm(message: string, defaultValue?: boolean): Promise<boolean> {
    const answer = await this.prompt([{ type: 'confirm', name: 'result', message, default: defaultValue }])
    return answer.result
  }

  /**
   * 要求从选项列表中进行选择。
   * @param message 问题描述.
   * @param choices 选择列表.
   */
  public static async select(message: string, choices: string[]): Promise<string> {
    const answer = await this.prompt([{ type: 'list', name: 'result', message, choices }])
    return answer.result
  }
}
