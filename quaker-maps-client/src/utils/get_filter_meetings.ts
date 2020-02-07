import { AppState } from '../App'
import { NavMenuSelectKeys, NavMenuSelectValues } from '../components/NavMenu/types'
import { UpdateMeetingsSelectKeys, UpdateMeetingsSelectValues } from '../components/UpdateMeetings/types'

/**
 * getFilterMeetings returns a function that filters meeting data based on user dropdown selections
 */

export const getFilterMeetings = (appState: AppState, setAppState: (appState: AppState) => void) => {
    return (newSelectValues: NavMenuSelectValues | UpdateMeetingsSelectValues) => {
        // Remove all meetings that don't meet ALL selected criteria
        const filteredMeetings = appState.meetings.filter(meeting => {
            for (let key in newSelectValues) {
                // Assure TypeScript that we expect all our keys will have the expected values
                const attr = key as UpdateMeetingsSelectKeys | NavMenuSelectKeys
                // Declare these two variables at the top, so Typescript believes they are the same values throughout
                const existingValue = meeting[attr]
                const newValue = newSelectValues[attr]

                if (!meeting.mappable || existingValue === undefined) return false

                // Handle for boolean values
                if (typeof existingValue === 'boolean') {
                    // We have to convert the meeting attribute to a string to match the value we get from the select dropdown
                    if ((newValue !== '' && // Don't filter based on a boolean if no option was selected
                        (existingValue && newValue !== 'true')) ||
                        (!existingValue && newValue === 'true')) {
                        return false
                    }

                // Handle for string values
                } else if (typeof existingValue === 'string') {
                    if (newValue && newValue !== existingValue) return false

                // Otherwise, it's an array
                } else if (
                    Array.isArray(existingValue) &&
                    Array.isArray(newValue) &&
                    newValue.length > 0
                ) {
                    if (existingValue.length !== newValue.length) return false
                    const arr1 = existingValue.sort()
                    const arr2 = newValue.sort()
                    for (let i = 0; i < arr1.length; i++) {
                        if (arr1[i] !== arr2[i]) {
                            return false
                        }
                    }
                }
            }
            return true
        })

        setAppState({ ...appState, filteredMeetings })
    }
}
