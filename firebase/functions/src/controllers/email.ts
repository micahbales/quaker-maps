import * as Mailgun from 'mailgun-js'
// We get our Mailgun credentials from the firebase functions config
// For more details: https://firebase.google.com/docs/functions/config-env
const functions = require('firebase-functions')
const apiKey: string = functions.config().mailgun.key
const domain = functions.config().mailgun.domain
const from = functions.config().mailgun.email

/**
 * sendUpdateEmail is fired when UpdateMeetings.tsx provides meetings to be updated
 * This function fires a (currently very crude) email with the update request details
 *
 * TODO: In the future it would be nice to have a more cleanly formatted email. Also, there is domain/DNS-level configuration yet to be done that would prevent these emails from being flagged as spam.
 */

export const sendUpdateEmail = async (req: any, res: any) => {
    const mailgun = new Mailgun({ apiKey, domain })

    const meetings = []
    for (let [key, value] of Object.entries(req.body.meetingUpdates)) {
        console.log(key) // TODO: Update linter rules so we don't have to use every variable we declare
        meetings.push(JSON.stringify(value))
    }

    const html = `
    <h1>You have a new update request:</h1>
    <h2>Submitter Details:</h2>
    <p>${JSON.stringify(req.body.submitterDetails)}</p>
    <h2>Meeting(s) to Update (${meetings.length} Total):</h2>
    <div>${meetings.map((meeting) => `<div>${meeting}</div>`)}</div>
`

    const data = {
        from,
        to: from,
        subject: 'New Update Request for Quaker Maps',
        html,
        message: 'multipart/form-data'
    }

    await mailgun.messages().send(data, (err: any, body: any) => {
        if (err) {
            return res.json({ error: 'Houston, we have a problem' })
            console.error(`Got an error: ${err}`)
        }
    })

    return res.json({ res: 'Success!' })
}
