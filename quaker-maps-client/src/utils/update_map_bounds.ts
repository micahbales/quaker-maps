import { MainMapState } from '../App'
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

interface UpdateMapBoundsOptions {
    filteredMeetings: Meeting[]
    map: any
    maps: any
    setMainMapState: (mainMapState: MainMapState) => void
    mainMapState: MainMapState
}

// Fit map to its bounds after the api is loaded
export const updateMapBounds = ({ filteredMeetings, map, maps, setMainMapState, mainMapState }: UpdateMapBoundsOptions) => {
    // Save map & maps to our mainMapState so that we can re-populate the map
    setMainMapState({ ...mainMapState, map, maps })

    // Only update bounds if there is map data to bound
    if (filteredMeetings.length > 0) {
        setMapBounds(map, maps, filteredMeetings)
    }
}
