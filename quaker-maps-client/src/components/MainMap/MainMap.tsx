import React from 'react'
import GoogleMapReact from 'google-map-react'
import { MapMarker } from '../MapMarker/MapMarker'
import { updateMapBounds } from '../../utils/update_map_bounds'
import { AppState, MainMapState } from '../../App'
import { Meeting } from '../../types'

interface MainMapProps {
    apiKey: string
    appState: AppState
    mainMapState: MainMapState
    setMainMapState: (mainMapState: MainMapState) => void
}

const initialMainMapState: MainMapState = {
    center: { lat: 0, lng: 0 },
    defaultZoom: 11,
}

export const MainMap: React.FC<MainMapProps> = ({
    apiKey,
    appState,
}) => {
    const [mainMapState, setMainMapState] = React.useState(initialMainMapState)
    return (
        <div style={{ height: '93vh', position: 'static', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                center={mainMapState.center}
                defaultZoom={mainMapState.defaultZoom}
                // Populate and bound map with meetings
                onGoogleApiLoaded={({ map, maps }) => {
                    const filteredMeetings = appState.filteredMeetings
                    updateMapBounds({ 
                        filteredMeetings, 
                        map, 
                        maps, 
                        setMainMapState, 
                        mainMapState 
                    })
                }}
                /**
                 * google-maps-react utils API doesn't currently have typings available,
                 * so we're bypassing the library to directly set bounds on the Google Maps API,
                 * as recommended by the library project owner:
                 * https://github.com/google-map-react/google-map-react/issues/753#issuecomment-493267236
                 */
                yesIWantToUseGoogleMapApiInternals={true}
            >
                {appState.filteredMeetings.map((meeting: Meeting, i) => (
                    <MapMarker
                        lat={meeting.latitude}
                        lng={meeting.longitude}
                        meeting={meeting}
                        key={i}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
}
