import { Box, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
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
    const { slug } = useParams<{ slug: string }>()
    const meeting: Meeting | undefined = meetings.find(m => m.slug === slug)

    if (!meeting) {
        return (
            <FourOhFour/>
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            paddingTop: 0,
        }}>
            <Typography variant="h3" component="h1" sx={{ fontSize: 36 }}>
                {meeting.title}
            </Typography>

            <MeetingMap meeting={meeting} height="300px" width="100%" />

            <MeetingDetails meeting={meeting} style={{ marginTop: '25px' }} />
        </Box>
    )
}


