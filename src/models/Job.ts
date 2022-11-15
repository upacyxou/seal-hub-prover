import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import JobStatus from '@/models/JobStatus'
import ProofResult from '@/models/ProofResult'

@modelOptions({
  schemaOptions: { timestamps: true, expireAfterSeconds: 24 * 60 * 60 * 1000 },
})
export class Job {
  @prop({
    required: true,
    index: true,
    enum: JobStatus,
    default: JobStatus.scheduled,
  })
  status!: JobStatus
  @prop({ _id: false })
  input?: {
    signature: string
    message: string
  }
  @prop()
  result?: ProofResult

  // Mongo fields
  createdAt?: Date
}

export const JobModel = getModelForClass(Job)
