import * as admin from 'firebase-admin'

// Initialize Firebase app
admin.initializeApp()

// Get Firestore Database
export const db = admin.firestore()