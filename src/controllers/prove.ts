import * as JSONbig from 'json-bigint'
import { Body, Controller, Ctx, Get, Params, Post } from 'amala'
import { Context } from 'koa'
import { Job, JobModel } from '@/models/Job'
import { notFound } from '@hapi/boom'
import JobStatus from '@/models/JobStatus'
import JsonProofInput from '@/validators/JsonProofInput'
import ProofInput from '@/validators/ProofInput'
import ProofResultParams from '@/validators/ProofResultParam'

@Controller('/')
export default class ProveController {
  @Post('/')
  async proof(@Body({ required: true }) input: JsonProofInput) {
    const { TPreComputes, U, s } = input
    const parsedInput: ProofInput = {
      TPreComputes: JSONbig.parse(TPreComputes),
      U: JSONbig.parse(U),
      s: JSONbig.parse(s),
    }
    const job = await JobModel.create({ input: parsedInput })
    job.input = undefined
    const result: { job: Job; position?: number } = { job }
    if (job.status === JobStatus.scheduled)
      result.position = await JobModel.countDocuments({
        status: JobStatus.scheduled,
        createdAt: { $lt: job.createdAt },
      })
    return { id: job._id, position: result.position || 0 }
  }
  @Get('/:id')
  async status(@Ctx() ctx: Context, @Params() { id }: ProofResultParams) {
    const job = await JobModel.findById(id)
    if (!job) return ctx.throw(notFound())

    job.input = undefined
    const result: { job: Job; position?: number } = { job }
    if (job.status === JobStatus.scheduled)
      result.position = await JobModel.countDocuments({
        status: JobStatus.scheduled,
        createdAt: { $lt: job.createdAt },
      })

    const { status, result: jobResult } = result.job
    return { status, result: jobResult }
  }
}
