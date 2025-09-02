import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import GoogleMapReact from 'google-map-react'
import { MapMarker } from '../MapMarker/MapMarker'
import { updateMapBounds } from '../../utils/update_map_bounds'
import { AppState } from '../../App'
import { Meeting } from '../../types'
import { measureMapRenderTime, logPerformanceMetrics } from '../../utils/performance'

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

export const MainMap: React.FC<MainMapProps> = ({
    apiKey,
    appState,
    marginLeft,
    width
}) => {
    const [mainMapState, setMainMapState] = React.useState(initialMainMapState)
    
    // Memoize map markers to prevent unnecessary re-renders with React 18
    const mapMarkers = useMemo(() => {
        const renderStartTime = performance.now();
        
        const markers = appState.filteredMeetings.length > 0 ? 
            appState.filteredMeetings.map((meeting: Meeting, i) => (
                <MapMarker
                    lat={meeting.latitude}
                    lng={meeting.longitude}
                    meeting={meeting}
                    key={i}
                />
            )) : [];
            
        const renderTime = measureMapRenderTime(renderStartTime);
        
        // Log map rendering performance
        if (appState.filteredMeetings.length > 0) {
            logPerformanceMetrics({ 
                mapRenderTime: renderTime
            });
        }
        
        return markers;
    }, [appState.filteredMeetings]);
    
    return (
        <Box
            sx={{
                flexGrow: 1,
                height: '93vh',
                position: 'static',
                width,
                marginLeft
            }}
        >
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
                {mapMarkers}
            </GoogleMapReact>
        </Box>
    )
}


