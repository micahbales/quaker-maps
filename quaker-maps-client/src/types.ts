export interface Meeting {
    accessibility: string
    address: string
    branch: string
    city: string
    created_at: {
        _seconds: number,
        _nanoseconds: number
    }
    description: string
    id: string
    latitude: number
    lgbt_affirming: boolean
    longitude: number
    mappable: boolean
    phone: string
    school_time: string
    slug: string
    state: string
    title: string
    website: string
    worship_style: string
    worship_time: string
    yearly_meeting: string
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
    