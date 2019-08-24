import * as functions from 'firebase-functions'
import * as express from 'express'
import { getMeeting, getMeetings } from './controllers/meetings'

// Initialize Express
const app = express()

/**
 * Meetings Routes
 */

app.get('/meetings', getMeetings)
app.get('/meetings/:docId', getMeeting)

// Expose express API to Firebase
exports.api = functions.https.onRequest(app)