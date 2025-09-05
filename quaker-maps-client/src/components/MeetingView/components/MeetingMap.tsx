import React from 'react'
import { Card } from '@mui/material'
import { Meeting } from '../../../types'
import { MapMarker } from '../../MapMarker/MapMarker'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
const apiKey: string | undefined = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

/**
 * MeetingMap is a map window to display the location of a single meeting
 */

interface MeetingMapProps {
    meeting: Meeting
    height: string
    width: string
}

export const MeetingMap: React.FC<MeetingMapProps> = ({
    meeting,
    height,
    width
}) => {
    const mainMapState = {
        center: { lat: meeting.latitude, lng: meeting.longitude },
        defaultZoom: 11,
    }
    return (
        <Card style={{
            height,
            padding: '10px',
            position: 'static',
            width
        }}>
            <APIProvider apiKey={apiKey || ''}>
                <Map
                    defaultCenter={mainMapState.center}
                    defaultZoom={mainMapState.defaultZoom}
                    style={{ width: '100%', height: '100%' }}
                >
                    <MapMarker
                        lat={meeting.latitude}
                        lng={meeting.longitude}
                        meeting={meeting}
                    />
                </Map>
            </APIProvider>
        </Card>
    )
}