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