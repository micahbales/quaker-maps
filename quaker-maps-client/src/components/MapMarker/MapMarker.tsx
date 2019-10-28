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
                    <h2 className={classes.header}>{meeting.title}</h2>
                    <ul className={classes.list}>
                        <li>{meeting.city && meeting.state && `Location: ${meeting.address && meeting.address} in ${meeting.city}, ${meeting.state}`}</li>
                        <li>{meeting.worship_style && `Worship Style: ${meeting.worship_style}`}</li>
                        <li>{meeting.yearly_meeting && `Yearly Meeting: ${meeting.yearly_meeting}`}</li>
                        <li>{meeting.branch && `Branch: ${meeting.branch}`}</li>
                        <li>{meeting.website && 'Website: '}{meeting.website && <a href={'http://' + meeting.website} target="_blank" rel="noopener noreferrer">{meeting.website}</a>}</li>
                    </ul>
                </Typography>
            </Popover>
        </>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontSize: 24,
        },
        list: {
            listStyleType: 'none',
            padding: 4,
        },
        typography: {
            padding: theme.spacing(2),
            paddingTop: theme.spacing(0),
        },
    }),
)
