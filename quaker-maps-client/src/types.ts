export interface Meeting {
    /* options selected/updated with selects (there are pre-defined fields) */
    accessibility: string
    branch: string
    worship_style: string
    yearly_meeting: string
    state: string
    lgbt_affirming: boolean
    mappable: boolean

    /* options selected/updated with text inputs */
    address: string
    city: string
    created_at: {
        _seconds: number,
        _nanoseconds: number
    } // auto-generated
    description: string
    id: string // auto-generated primary key
    latitude: number
    longitude: number
    phone: string
    school_time: string
    slug: string // auto-generated based on title
    title: string
    website: string
    worship_time: string
    zip: string
}

export type MeetingFields =
    'accessibility' |
    'address' |
    'branch' |
    'city' |
    // 'created_at' |
    'description' |
    'id' |
    // 'latitude' |
    // 'lgbt_affirming' |
    // 'longitude' |
    // 'mappable' |
    'phone' |
    'school_time' |
    'slug' |
    'state' |
    'title' |
    'website' |
    'worship_style' |
    'worship_time' |
    'yearly_meeting' |
    'zip'
