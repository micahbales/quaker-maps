import { Meeting } from '../../types'

export interface UpdateMeetingsViewProps {
    meetings: Meeting[]
}

export interface MeetingUpdates {
    [key: string] : object
}

export interface SubmitterDetails {
    [key: string] : string
}

export interface UpdateMeetingsSelectValues {
    accessibility: string
    branch: string
    lgbt_affirming: string
    state: string
    worship_style: string
    yearly_meeting: string
}

export interface UpdateMeetingsInputValues {
    title: string
    address: string
    city: string
    state: string
    zip: string
    latitude: string
    longitude: string
    phone: string
    website: string
    worship_time: string
    school_time: string
    description: string
}

export type UpdateMeetingsSelectKeys = 'branch' | 'lgbt_affirming' | 'state' | 'worship_style' | 'yearly_meeting'

export type UpdateMeetingsSelectTitleKeys = 'accessibilitys' | 'branchs' | 'lgbt_affirmings' | 'states' | 'worship_styles' | 'yearly_meetings'

export type UpdateMeetingsInputTitleKeys = 'title' | 'address' | 'city' | 'state' | 'zip' | 'latitude' | 'longitude' | 'phone' | 'website' | 'worship_time' | 'school_time' | 'description' // | 'created_at' | 'id' | 'slug'

export interface UpdateMeetingsTitles {
    accessibilitys: string[]
    branchs: string[]
    lgbt_affirmings: string[]
    states: string[]
    worship_styles: string[]
    yearly_meetings: string[]
}
