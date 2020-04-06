/**
 * fetchMeetings consumes a url and makes a simple GET request to retrieve meetings data
 * It returns either an array of Meetings, or an empty array
 */

export const fetchMeetings = async (url: string) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            return await response.json()
        } else {
            console.error('No meetings available!')
            return []
        }
    } catch (err) {
        console.error(err)
        return []
    }
}
