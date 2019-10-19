export const fetchMeetings = async () => {
    const response = await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/meetings')
    const meetingsObj = await response.json()
    return meetingsObj.meetings
}