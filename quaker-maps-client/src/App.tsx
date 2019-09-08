import React from 'react'
import { fetchMeetings } from './api/fetch_meetings'
import { Meeting } from './types'
import { MainMap } from './components/MainMap/MainMap'
import { NavBar } from './components/NavBar/NavBar'
import { CssBaseline } from '@material-ui/core';
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY


export interface AppState {
  center: {
    lat: number
    lng: number
  }
  defaultZoom: number
  map?: any
  maps?: any
  meetings: Meeting[]
}

const App: React.FC = () => {
  const initialState: AppState = {
    meetings: [],
    center: { lat: 0, lng: 0 },
    defaultZoom: 11,
  }
  
  const [appState, setAppState] = React.useState(initialState)
  
  React.useEffect(() => {
    fetchMeetings(appState, setAppState)
  }, [])

  return apiKey ? (
    <>
      <CssBaseline />
      <NavBar 
        meetings={appState.meetings}
      />
      <MainMap
        apiKey={apiKey}
        appState={appState}
        setAppState={setAppState}
      />
    </>
  ) : (
    <h1>
      Error: Need Valid API Key
    </h1>
  )
}

export default App
