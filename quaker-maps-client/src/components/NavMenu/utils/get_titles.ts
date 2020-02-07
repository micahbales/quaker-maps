import uniq from 'lodash/uniq'
import flatten from 'lodash/flatten'
import { Meeting, MeetingFields } from '../../../types'

/**
 * getTitles extracts the names of every meeting attribute
 * For example, if given a meeting and the 'yearly_meeting' attribute, it will return an array of
 * the title (name) of every yearly meeting
 */

export const getTitles = (meetings: Meeting[], attr: MeetingFields): string[] =>
    uniq(
        flatten(
            meetings.map(
                (meeting) => {
                    if (!meeting.mappable) return ''
                    const values = meeting[attr] as string | string[]
                    if (!values) return []
                    if (typeof values === 'string') {
                        return values
                    }
                    return values.map((m) => m.trim())
                }
            )
        )
    )
        .sort()
