import React from 'react'
import Popover from '@mui/material/Popover'
import { Marker } from '@vis.gl/react-google-maps'
import { Meeting } from '../../types'
import { MeetingDetails } from '../MeetingView/components/MeetingDetails'
import { deepPurple } from '@mui/material/colors'

/**
 * MapMarker is the marker that represents a meeting on a map. It includes a popover with details about the meeting
 */

interface MapMarkerProps {
    lat: number
    lng: number
    meeting: Meeting
}

export const MapMarker: React.FC<MapMarkerProps> = ({
    lat,
    lng,
    meeting,
}) => {
    const [anchorPosition, setAnchorPosition] = React.useState<{ mouseX: number; mouseY: number } | null>(null)


    const handleClick = (e: google.maps.MapMouseEvent) => {
        if (e.domEvent instanceof MouseEvent) {
            setAnchorPosition({
                mouseX: e.domEvent.clientX,
                mouseY: e.domEvent.clientY,
            })
        }
    }

    const handleClose = () => {
        setAnchorPosition(null)
    }

    const open = Boolean(anchorPosition)
    const id = open ? 'meeting-popover' : undefined

    return (
        <>
            <Marker 
                position={{ lat, lng }} 
                onClick={handleClick}
                icon={`data:image/svg+xml,${homeIconSvg}`}
                aria-describedby={id}
            />
            <Popover
                id={id}
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={
                    anchorPosition
                        ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
                        : { top: 0, left: 0 }
                }
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MeetingDetails meeting={meeting} title={meeting.title} />
            </Popover>
        </>
    )
}

// SVG icon for the map marker, encoded as a data URL
const homeIconSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${deepPurple[500]}">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
`);
