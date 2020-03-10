import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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
    const classes = useStyles()
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
                className={classes.marker}
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            border: 0,
            fontSize: 24,
            margin: '12px 0 0 0',
            textAlign: 'center'
        },
        /**
         * The marker must be repositioned manually because google-map-react positions the marker according to its upper-left-hand corner, rather than its center
         * Without this styling, the markers change positions depending on the level of zoom
         * For more information, see https://github.com/google-map-react/google-map-react/blob/master/API.md#positioning-a-marker
         */
        marker: {
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
        },
    }),
)
