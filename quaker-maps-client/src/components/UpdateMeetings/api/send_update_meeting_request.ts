/**
 * sendUpdateMeetingRequest sends a request for meeting records to be updated
 */

export const sendUpdateMeetingRequest = async ({
    meetingUpdates,
    submitterDetails
}: any) => await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/update_request', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({submitterDetails, meetingUpdates}) // body data type must match 'Content-Type' header
    })
