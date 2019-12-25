import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router'
import { FourOhFour } from '../../static_pages/FourOhFour'
import { Meeting } from '../../types'
import { MeetingDetails } from './components/MeetingDetails'
import { MeetingMap } from './components/MeetingMap'

/**
 * MeetingView is the individual meeting view, accessible at /meeting/meeting-slug
 */

interface MeetingViewProps {
    meetings: Meeting[]
}

export const MeetingView: React.FC<MeetingViewProps> = ({
     meetings
 }) => {
    const classes = useStyles()
    const { slug } = useParams()
    const meeting: Meeting | undefined = meetings.find(m => m.slug === slug)

    if (!meeting) {
        return (
            <FourOhFour/>
        )
    }

    return (
        // Typography's base component is <p>, but this caused issues. See: https://stackoverflow.com/a/53494821/5767962
        <Typography className={classes.typography} component={'div'}>
            <h1 className={classes.header}>{meeting.title}</h1>

            <MeetingMap meeting={meeting} height="300px" width="100%" />

            <MeetingDetails meeting={meeting} style={{ marginTop: '25px' }} />
        </Typography>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontSize: 36,
        },
        typography: {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            paddingTop: theme.spacing(0),
        }
    })
)
