import { Card, Link, createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { Meeting } from '../../../types'

/**
 * MeetingDetails is a card that contains the details for an individual meeting
 */

interface MeetingDetailsProps {
    meeting: Meeting,
    style?: object
    title?: string
}

export const MeetingDetails: React.FC<MeetingDetailsProps> = ({
   meeting,
   style,
   title
}) => {
    const classes = useStyles()
    return (
        <Card style={{ ...style, padding: '10px' }}>
            {title && (
                <Link href={`/meeting/${meeting.slug}`}>
                    <h2 className={classes.header}>{meeting.title}</h2>
                </Link>
            )}
            <ul className={classes.list}>
                <li>{meeting.city && meeting.state && `Location: ${meeting.address && meeting.address} in ${meeting.city}, ${meeting.state}`}</li>
                <li>{meeting.worship_style && `Worship Style: ${meeting.worship_style}`}</li>
                <li>{meeting.yearly_meeting && `Yearly Meeting: ${meeting.yearly_meeting}`}</li>
                <li>{meeting.branch && `Branch: ${meeting.branch}`}</li>
                <li>{meeting.website && 'Website: '}{meeting.website && <a href={'http://' + meeting.website} target="_blank" rel="noopener noreferrer">{meeting.website}</a>}</li>
            </ul>
        </Card>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontSize: 24,
            textAlign: 'center',
        },
        list: {
            listStyleType: 'none',
            padding: 4,
        }
    })
)
