import React from 'react'
import GoogleMapReact from 'google-map-react'
import { MapMarker } from './components/MapMarker/MapMarker'
import { Meeting } from './types'

interface AppState {
  meetings: Meeting[],
  center: {
    lat: number,
    lng: number,
  },
  zoom: number,
}

const App: React.FC = () => {
  const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const initialState: AppState = {
    meetings: [],
    center: { lat: 35, lng: -92 },
    zoom: 11,
  }

  const [appState, setAppState] = React.useState(initialState)

  React.useEffect(() => {
    // Request all meetings from Firebase when App mounts
    const getMeetings = async () => {
      const response = await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/meetings')
      const meetingsObj = await response.json()
      const meetings = meetingsObj.meetings
      setAppState({ ...appState, meetings, center: { lat: meetings[0].latitude, lng: meetings[0].longitude } })
    }
    getMeetings()
  }, [])

  return apiKey ? (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={appState.center}
        zoom={appState.zoom}
      >
        {appState.meetings.map((meeting: Meeting, i) => (
          <MapMarker
            lat={meeting.latitude}
            lng={meeting.longitude}
            text={meeting.title}
            key={i}
          />
        ))}
      </GoogleMapReact>
    </div>
  ) : (
      <h1>Error: Need Valid API Key</h1>
    )
}

export default App;
