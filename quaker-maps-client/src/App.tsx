import React from 'react'
import { fetchMeetings } from './api/fetch_meetings'
import { Meeting } from './types'
import { MainMap } from './components/MainMap/MainMap'
import { NavBar } from './components/NavBar/NavBar'
import { CssBaseline } from '@material-ui/core';
import { updateMapBounds } from './utils/update_map_bounds'
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY


export interface AppState {
  center: {
    lat: number
    lng: number
  }
  defaultZoom: number
  filteredMeetings: Meeting[]
  map?: any
  maps?: any
  meetings: Meeting[]
}

const App: React.FC = () => {
  const initialState: AppState = {
    center: { lat: 0, lng: 0 },
    defaultZoom: 11,
    filteredMeetings: [],
    meetings: [],
  }
  
  const [appState, setAppState] = React.useState(initialState)
  
  // Fetch initial meeting state
  React.useEffect(() => {
    fetchMeetings(appState, setAppState)
  }, [])

  // Re-populate and re-bound map whenever meetings are filtered
  React.useEffect(() => {
    if (appState.map && appState.maps) {
      const map = appState.map
      const maps = appState.maps
      updateMapBounds({ map, maps, appState, setAppState })
    }
  }, [appState.filteredMeetings])

  const filterMeetings = (newSelectValues: string[]) => {
    // Remove all meetings that don't meet ALL selected criteria
    const filteredMeetings = appState.meetings.filter(meeting => {
      for (let attr in newSelectValues) {
        // @ts-ignore : Element implicitly has an 'any' type because expression of type 'any' can't be used to index type
        if (!meeting[attr]) continue
        // @ts-ignore - TODO: figure out why Typescript doesn't like us using a string as an index type here
        if (newSelectValues[attr] && !meeting[attr].includes(newSelectValues[attr])) return false
      }
      return true
    })
    setAppState({ ...appState, filteredMeetings })
  }

  return apiKey ? (
    <>
      <CssBaseline />
      <NavBar
        filterMeetings={filterMeetings}
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
