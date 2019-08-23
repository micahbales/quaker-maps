import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import helloWorld from './controllers/hello_world'
admin.initializeApp()
const app = express()

app.get('/helloWorld', helloWorld)

exports.api = functions.https.onRequest(app)