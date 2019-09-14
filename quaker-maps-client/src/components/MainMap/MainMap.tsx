import React from 'react'
import GoogleMapReact from 'google-map-react'
import { MapMarker } from '../MapMarker/MapMarker'
import { updateMapBounds } from '../../utils/update_map_bounds'
import { AppState } from '../../App'
import { Meeting } from '../../types'

interface MainMapProps {
    apiKey: string
    appState: AppState
    setAppState: (appState: AppState) => void
}

export const MainMap: React.FC<MainMapProps> = ({
    apiKey,
    appState,
    setAppState,
}) => (
    <div style={{ height: '100vh', position: 'static', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            center={appState.center}
            defaultZoom={appState.defaultZoom}
            // Populate and bound map with meetings
            onGoogleApiLoaded={({ map, maps }) => updateMapBounds({ map, maps, setAppState, appState })}
            /**
             * google-maps-react utils API doesn't currently have typings available,
             * so we're bypassing the library to directly set bounds on the Google Maps API,
             * as recommended by the library project owner:
             * https://github.com/google-map-react/google-map-react/issues/753#issuecomment-493267236
             */
            yesIWantToUseGoogleMapApiInternals={true}
        >
            {appState.meetings.map((meeting: Meeting, i) => (
                <MapMarker
                    lat={meeting.latitude}
                    lng={meeting.longitude}
                    text={meeting.title}
                    key={i}
                />
            ))}
        </GoogleMapReact>
    </div>
)
