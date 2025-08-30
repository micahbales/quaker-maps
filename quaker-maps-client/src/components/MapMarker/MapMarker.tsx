import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import { Meeting } from '../../types'
import { MeetingDetails } from '../MeetingView/components/MeetingDetails'

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
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'meeting-popover' : undefined

    return (
        <>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)'
                }}
                children={<HomeIcon color="primary" />} 
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
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


