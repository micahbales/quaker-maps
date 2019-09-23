import { AppState } from '../App'

export const getFilterMeetings = (appState: AppState, setAppState: (appState: AppState) => void) => {
    return (newSelectValues: string[]) => {
        // Remove all meetings that don't meet ALL selected criteria
        const filteredMeetings = appState.meetings.filter(meeting => {
            for (let attr in newSelectValues) {
                // @ts-ignore : Element implicitly has an 'any' type because expression of type 'any' can't be used to index type
                if (!meeting[attr]) continue
                // @ts-ignore - TODO: figure out why Typescript doesn't like us using a string as an index type here
                if (newSelectValues[attr] && !meeting[attr].includes(newSelectValues[attr])) return false
            }
            return true
        })
        setAppState({ ...appState, filteredMeetings })
    }
}