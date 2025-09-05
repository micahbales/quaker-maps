import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { MapMarker } from '../MapMarker/MapMarker'
import { updateMapBounds } from '../../utils/update_map_bounds'
import { AppState } from '../../App'
import { Meeting } from '../../types'
import { measureMapRenderTime, logPerformanceMetrics } from '../../utils/performance'
import { initial } from 'lodash'

/**
 * MainMap is the primary map of meetings that is displayed on the home page
 */

interface MainMapProps {
    apiKey: string
    appState: AppState
    marginLeft: string
    width: string
}
export interface MainMapState {
    center: {
        lat: number
        lng: number
    }
    defaultZoom: number
    map?: any
    maps?: any
}

const initialMainMapState: MainMapState = {
    // If there are no meetings, center map on North America and zoom out
    center: { lat: 39.8283, lng: -98.5795 },
    defaultZoom: 4,
}

export const MainMap: React.FC<MainMapProps> = ({apiKey, appState, marginLeft, width}) => {
    return <Box sx={{ height: '93vh', width: '100%' }}>
        <APIProvider apiKey={apiKey || ''}>
            <Map
                defaultCenter={initialMainMapState.center}
                defaultZoom={initialMainMapState.defaultZoom}
                style={{ width: '100%', height: '100%' }}
                // Populate and bound map with meetings
                onIdle={({ map }) => {
                    const filteredMeetings = appState.filteredMeetings
                    updateMapBounds({
                        filteredMeetings,
                        map,
                        maps: window.google.maps,
                    })
                }}
            >
                {appState.filteredMeetings.map((meeting: Meeting, i: number) => (
                    <MapMarker
                        key={meeting.slug || i}
                        lat={meeting.latitude}
                        lng={meeting.longitude}
                        meeting={meeting}
                    />
                ))}
            </Map>
        </APIProvider>
    </Box>
}