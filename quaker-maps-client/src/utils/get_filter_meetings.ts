import { AppState } from '../App'

export const getFilterMeetings = (appState: AppState, setAppState: (appState: AppState) => void) => {
    return (newSelectValues: string[]) => {
        // Remove all meetings that don't meet ALL selected criteria
        const filteredMeetings = appState.meetings.filter(meeting => {
            for (let attr in newSelectValues) {
                // @ts-ignore (see note at bottom of file)
                if (!meeting.mappable || meeting[attr] === undefined) return false

                // @ts-ignore
                if (meeting[attr] === '' || newSelectValues[attr] === '') continue
                
                // @ts-ignore
                // Handle for boolean values
                if (typeof meeting[attr] === 'boolean') {
                    // @ts-ignore
                    // We have to convert the meeting attribute to a string to match the value we get from the select dropdown
                    if (String(meeting[attr]) !== newSelectValues[attr]) return false
                
                // Handle for string values
                } else {
                    // @ts-ignore
                    if (newSelectValues[attr] && !meeting[attr].includes(newSelectValues[attr])) return false
                }
            }
            return true
        })
        if (filteredMeetings.length > 0) {
            setAppState({ ...appState, filteredMeetings })
        }
    }
}

/**
 * For some reason, on each line we have a @ts-ignore, we're getting the following error from TypeScript:
 * "Element implicitly has an 'any' type because expression of type 'any' can't be used to index type"
 * It's not clear what this error is about, but it would be ideal to figure this out rather than resorting to simply shutting TypeScript down, line by line
 * TODO: Figure out why Typescript doesn't like us using a string as an index type here
 */
