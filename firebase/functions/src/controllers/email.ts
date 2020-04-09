const sgMail = require('@sendgrid/mail')
import { Meeting } from '../../../../quaker-maps-client/src/types'
// We get our SendGrid credentials from the firebase functions config
// For more details: https://firebase.google.com/docs/functions/config-env
const functions = require('firebase-functions')
const apiKey: string = functions.config().sendgrid.key
const from = functions.config().sendgrid.email

/**
 * sendUpdateEmail is fired when UpdateMeetings.tsx provides meetings to be updated
 * This function fires a (currently very crude) email with the update request details
 *
 * TODO: In the future it would be nice to have a more cleanly formatted email. Also, there is domain/DNS-level configuration yet to be done that would prevent these emails from being flagged as spam.
 */

export const sendUpdateEmail = async (req: any, res: any) => {
    sgMail.setApiKey(apiKey)

    const meetings: string[] = []
    req.body.meetingUpdates.forEach((meeting: Meeting) => meetings.push(JSON.stringify(meeting)))

    const html = `
    <h1>You have a new update request:</h1>
    <h2>Submitter Details:</h2>
    <p>${JSON.stringify(req.body.submitterDetails)}</p>
    <h2>Meeting(s) to Update (${meetings.length} Total):</h2>
    <div>${meetings.map((meeting) => `<div>${meeting}</div>`)}</div>
    `

    const msg = {
        from,
        to: from,
        subject: 'New Update Request for Quaker Maps',
        html,
        message: 'multipart/form-data'
    }

    await sgMail.send(msg)

    return res.json({ res: 'Success!' })
}
