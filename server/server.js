import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import './config/instrument.js'
import * as Sentry from '@sentry/node'
import { clerkWebhooks } from './controllers/webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import { clerkMiddleware } from '@clerk/express'

// Initialize Express
const app = express()

//Connect to DB
await connectDB()
await connectCloudinary()

//middlewares
app.use(cors())

app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)

app.use(express.json())
app.use(clerkMiddleware())

//routes
app.get('/', (req, res) => {
  res.send('API working')
})
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!')
})
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
