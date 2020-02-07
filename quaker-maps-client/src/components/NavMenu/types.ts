import { Meeting } from '../../types'

export interface NavMenuProps {
    filterMeetings: (selectValues: NavMenuSelectValues) => void
    meetings: Meeting[]
    setDrawerIsOpen: (option: boolean) => void
    navMenuWidth: string
}

export interface NavMenuSelectValues {
    branch: string[]
    lgbt_affirming: string
    state: string
    worship_style: string[]
    yearly_meeting: string[]
}

export type NavMenuSelectKeys = 'branch' | 'lgbt_affirming' | 'state' | 'worship_style' | 'yearly_meeting'

export type NavMenuSelectTitleKeys = 'branchs' | 'lgbt_affirmings' | 'states' | 'worship_styles' | 'yearly_meetings'

export interface NavMenuSelectTitles {
    branchs: string[]
    lgbt_affirmings: string[]
    states: string[]
    worship_styles: string[]
    yearly_meetings: string[]
}
