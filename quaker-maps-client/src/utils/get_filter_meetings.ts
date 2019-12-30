import { AppState } from '../App'
import { SelectKeys, SelectValues } from '../types'

export const getFilterMeetings = (appState: AppState, setAppState: (appState: AppState) => void) => {
    return (newSelectValues: SelectValues) => {
        // Remove all meetings that don't meet ALL selected criteria
        const filteredMeetings = appState.meetings.filter(meeting => {
            for (let key in newSelectValues) {
                // Assure TypeScript that we expect all our newSelectValues attributes to be SelectValues
                const attr = key as SelectKeys

                if (!meeting.mappable || meeting[attr] === undefined) return false

                if (meeting[attr] === '' || newSelectValues[attr] === '') continue

                // Handle for boolean values
                if (typeof meeting[attr] === 'boolean') {
                    // We have to convert the meeting attribute to a string to match the value we get from the select dropdown
                    if (String(meeting[attr]) !== newSelectValues[attr]) return false

                // Handle for string values
                } else {
                    // TypeScript doesn't believe that this isn't a boolean, despite the fact that we've proved it above
                    const value = meeting[attr] as string
                    if (newSelectValues[attr] && !value.includes(newSelectValues[attr])) return false
                }
            }
            return true
        })

        setAppState({ ...appState, filteredMeetings })
    }
}
