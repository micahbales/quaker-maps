import { Card, Link, Typography, Box } from '@mui/material';
import React from 'react';
import { Meeting } from '../../../types';

/**
 * MeetingDetails is a card that contains the details for an individual meeting
 */

interface MeetingDetailsProps {
  meeting: Meeting;
  style?: object;
  title?: string;
}

function handleMultiValueFields(multiValueArr: string[]): string {
  return multiValueArr.reduce(
    (acc, val, i, m) => acc + `${val + (m[i + 1] ? ', ' : ' ')}`,
    ' '
  );
}

export const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  meeting,
  style,
  title,
}) => {
  return (
    <Card sx={{ ...style, padding: '10px' }}>
      {title && (
        <Link href={`/meeting/${meeting.slug}`}>
          <Typography 
            variant="h2" 
            sx={{
              fontSize: 24,
              textAlign: 'center',
            }}
          >
            {meeting.title}
          </Typography>
        </Link>
      )}
      <Box 
        component="ul" 
        sx={{
          listStyleType: 'none',
          padding: '4px',
        }}
      >
        {meeting.city && meeting.state && (
          <li>
            Location: {meeting.address && meeting.address} in {meeting.city},{' '}
            {meeting.state}
          </li>
        )}
        {meeting.worship_time && <li>Worship Time: {meeting.worship_time}</li>}
        {meeting.worship_style.length > 0 && (
          <li>
            Worship Style: {handleMultiValueFields(meeting.worship_style)}
          </li>
        )}
        {meeting.yearly_meeting.length > 0 && (
          <li>
            Yearly Meeting: {handleMultiValueFields(meeting.yearly_meeting)}
          </li>
        )}
        {meeting.branch.length > 0 && (
          <li>
            Branch:
            {handleMultiValueFields(meeting.branch)}
          </li>
        )}
        {meeting.accessibility.length > 0 && (
          <li>
            Accessibility: {handleMultiValueFields(meeting.accessibility)}
          </li>
        )}
        {meeting.description && <li>Notes: {meeting.description}</li>}
        {meeting.website && (
          <li>
            Website:{' '}
            <a
              href={'http://' + meeting.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {meeting.website}
            </a>
          </li>
        )}
      </Box>
    </Card>
  );
};
