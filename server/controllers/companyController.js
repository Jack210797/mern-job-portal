import Company from '../models/Company.js'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'
import Job from '../models/Job.js'
import JobApplication from '../models/JobApplication.js'

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body

  const image = req.file

  if (!name || !email || !password || !image) {
    return res.json({ success: false, message: 'Missing Details' })
  }

  try {
    const companyExists = await Company.findOne({ email })

    if (companyExists) {
      return res.json({ success: false, message: 'Company already registered' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const imageUpload = await cloudinary.uploader.upload(image.path)

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url
    })

    return res.json({
      success: true,
      company: { _id: company._id, name: company.name, email: company.email, image: company.image },
      token: generateToken(company._id),
      message: 'Company registered successfully'
    })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Login a company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body

  try {
    const company = await Company.findOne({ email })

    if (bcrypt.compareSync(password, company.password)) {
      res.json({
        success: true,
        company: { _id: company._id, name: company.name, email: company.email, image: company.image },
        token: generateToken(company._id),
        message: 'Company logged in successfully'
      })
    } else {
      res.json({ success: false, message: 'Invalid Email or Password' })
    }
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company
    res.json({ success: true, company })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body

  const companyId = req.company._id

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category
    })

    await newJob.save()

    res.json({ success: true, newJob })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Get company job applications
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id

    const companyJobs = await Job.find({ companyId })
    const jobIds = companyJobs.map((job) => job._id)

    //Find job applications for the user and populate related data
    const applications = await JobApplication.find({ jobId: { $in: jobIds } })
      .populate('userId', 'name email resume image')
      .populate('jobId', 'title location category level salary')
      .exec()

    return res.json({ success: true, applicants: applications })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id

    const jobs = await Job.find({ companyId })

    // adding No. of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id })
        return { ...job.toObject(), applicants: applicants.length }
      })
    )

    res.json({ success: true, jobsData })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//Change Job Application Status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body

    //find job application data and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status })

    res.json({ success: true, message: 'Status Changed' })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

// Change Job Visibility
export const changeJobVisibility = async (req, res) => {
  try {
    const { id } = req.body

    const companyId = req.company._id

    const job = await Job.findById(id)

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible
    }
    await job.save()

    res.json({ success: true, job })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
