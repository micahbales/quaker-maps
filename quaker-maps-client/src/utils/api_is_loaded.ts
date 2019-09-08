import { AppState } from '../App'
import { Meeting } from '../types'

const getMapBounds = (maps: any, meetings: Meeting[]) => {
    const bounds = new maps.LatLngBounds()

    meetings.forEach((meeting: Meeting) => {
        bounds.extend(new maps.LatLng(
            meeting.latitude,
            meeting.longitude,
        ))
    })
    return bounds
}

const setMapBounds = (map: any, maps: any, meetings: Meeting[]) => {
    // Get bounds by our meetings
    const bounds = getMapBounds(maps, meetings)
    // Fit map to bounds
    map.fitBounds(bounds)
}

interface ApiIsLoadedOptions {
    map: any
    maps: any
    setAppState: (appState: AppState) => void
    appState: AppState
}

// Fit map to its bounds after the api is loaded
export const apiIsLoaded = ({ map, maps, setAppState, appState }: ApiIsLoadedOptions) => {
    setAppState({ ...appState, map, maps })
    
    // Only update bounds if there is map data to bound
    if (appState.meetings.length > 0) {
        setMapBounds(map, maps, appState.meetings)
    }
}
