import { Body, Controller, Post } from 'amala'
import Inputs from '@/validators/Inputs'
import build, { generateInput } from '@/helpers/generateProof'

@Controller('/')
export default class ProveController {
  @Post('/')
  generateProof(@Body({ required: true }) { signature, message }: Inputs) {
    const inputs = generateInput(signature, message)
    return build(inputs)
  }
}
