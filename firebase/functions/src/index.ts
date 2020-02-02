import * as functions from 'firebase-functions'
import * as express from 'express'
import { sendUpdateEmail } from './controllers/email'
import { getMeeting, getMeetings } from './controllers/meetings'

// Initialize Express
const app = express()

// Allow CORS requests from client
app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

/**
 * Meetings Routes
 */

app.get('/meetings', getMeetings)
app.get('/meetings/:docId', getMeeting)
app.post('/update_request', sendUpdateEmail)

// Expose express API to Firebase
exports.api = functions.https.onRequest(app)
