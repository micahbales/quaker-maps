import { AppState, MainMapState } from '../App'



export const fetchMeetings = async (
    appState: AppState, 
    setAppState: (appState: AppState) => void, 
    mainMapState: MainMapState, 
    setMainMapState: (mainMapState: MainMapState) => void 
) => {
    const response = await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/meetings')
    const meetingsObj = await response.json()
    const meetings = meetingsObj.meetings
    setAppState({ 
        ...appState,
        filteredMeetings: meetings, 
        meetings, 
    })
    setMainMapState({
        ...mainMapState,
        center: {
            lat: meetings[0].latitude,
            lng: meetings[0].longitude
        },
    })
}