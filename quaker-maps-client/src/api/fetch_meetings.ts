/**
 * fetchMeetings consumes a url and makes a simple GET request to retrieve meetings data
 * It returns either an array of Meetings, or an empty array
 */

export const fetchMeetings = async (url: string) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            return data.meetings
        } else {
            return []
        }
    } catch (err) {
        console.error(err)
        return []
    }
}
