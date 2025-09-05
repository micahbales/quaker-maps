import { Meeting } from '../types'

const getMapBounds = (maps: any, meetings: Meeting[]) => {
  const bounds = new maps.LatLngBounds()
  meetings.forEach((meeting: Meeting) => {
    bounds.extend(new maps.LatLng(meeting.latitude, meeting.longitude))
  })
  return bounds
}

const setMapBounds = (map: any, maps: any, meetings: Meeting[]) => {
  const bounds = getMapBounds(maps, meetings)
  map.fitBounds(bounds)
}

interface UpdateMapBoundsOptions {
  filteredMeetings: Meeting[]
  map: any
  maps: any
}

// Fit map to its bounds after the api is loaded
export const updateMapBounds = ({ filteredMeetings, map, maps }: UpdateMapBoundsOptions) => {
  if (filteredMeetings.length > 0) {
    setMapBounds(map, maps, filteredMeetings)
  }
}
