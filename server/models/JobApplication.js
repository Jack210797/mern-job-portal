import mongoose from 'mongoose'

const JobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: String, ref: 'User', required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Number, required: true }
})

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema)

export default JobApplication
