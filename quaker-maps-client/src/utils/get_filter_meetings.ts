import { AppState } from '../App'
import { NavMenuSelectKeys, NavMenuSelectValues } from '../components/NavMenu/types'
import {
  UpdateMeetingsSelectKeys,
  UpdateMeetingsSelectValues,
} from '../components/UpdateMeetings/types'

/**
 * getFilterMeetings returns a function that filters meeting data based on user dropdown selections
 */

export const getFilterMeetings = (
  appState: AppState,
  setAppState: (appState: AppState) => void
) => {
  return (newSelectValues: NavMenuSelectValues | UpdateMeetingsSelectValues) => {
    // Remove all meetings that don't meet ALL selected criteria
    const filteredMeetings = appState.meetings.filter(meeting => {
      for (const key in newSelectValues) {
        // Assure TypeScript that we expect all our keys will have the expected values
        const attr = key as UpdateMeetingsSelectKeys | NavMenuSelectKeys
        // Declare these two variables at the top, so Typescript believes they are the same values throughout
        const meetingAttribute = meeting[attr]
        const filterValue = newSelectValues[attr]

        if (!meeting.mappable || meetingAttribute === undefined) return false

        // Handle for boolean values
        if (typeof meetingAttribute === 'boolean') {
          // We have to convert the meeting attribute to a string to match the value we get from the select dropdown
          if (
            (filterValue !== '' && // Don't filter based on a boolean if no option was selected
              meetingAttribute &&
              filterValue !== 'true') ||
            (!meetingAttribute && filterValue === 'true')
          ) {
            return false
          }

          // Handle for string values
        } else if (typeof meetingAttribute === 'string') {
          if (filterValue && filterValue !== meetingAttribute) return false

          // Otherwise, it's an array (multi-select)
        } else if (
          Array.isArray(meetingAttribute) &&
          Array.isArray(filterValue) &&
          filterValue.length > 0
        ) {
          // Don't include a meeting unless its attribute array contains every filter value
          const notEveryFilterValue = !filterValue.every(value => meetingAttribute.includes(value))
          if (notEveryFilterValue) return false
        }
      }
      return true
    })

    setAppState({ ...appState, filteredMeetings })
  }
}
