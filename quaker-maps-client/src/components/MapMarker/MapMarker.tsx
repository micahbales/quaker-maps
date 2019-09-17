import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Meeting } from '../../types'

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
            <IconButton aria-describedby={id} onClick={handleClick}>
                <HomeIcon color="primary"/>
            </IconButton>
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
                <Typography
                    className={classes.typography}
                    // Typography's base component is <p>, but this caused issues. See: https://stackoverflow.com/a/53494821/5767962
                    component={'div'}
                >
                    <h3>{meeting.title}</h3>
                    <p>
                        Located in {meeting.city}, {meeting.state}, {meeting.title} meets for {meeting.worship_style} worship.
                    </p>
                    <p>
                        {meeting.yearly_meeting && `${meeting.title} is part of ${meeting.yearly_meeting}. `}
                        {meeting.branch && `It is part of ${meeting.yearly_meeting}`}
                    </p>
                    <p>
                        {meeting.website && `Learn more about this meeting at its `}
                        {meeting.website && <a href={meeting.website} target="_blank" rel="noopener noreferrer">website</a>}{`.`}
                    </p>
                </Typography>
            </Popover>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
        },
    }),
)
