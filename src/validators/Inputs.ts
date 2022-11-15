import { IsString } from 'amala'

export default class Inputs {
  @IsString()
  message!: string
  @IsString()
  signature!: string
}
