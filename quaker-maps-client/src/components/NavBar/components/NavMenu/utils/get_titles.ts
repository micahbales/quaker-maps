import uniq from 'lodash/uniq'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import { Meeting, MeetingFields } from '../../../../../types'

export const getTitles = (meetings: Meeting[], attr: MeetingFields) =>
    uniq(flatten(meetings.map((meeting) => map(meeting[attr] && meeting[attr].split(','), (m) => m.trim())))).sort()