import React from 'react'
import { fetchMeetings } from './api/fetch_meetings'
import { Meeting } from './types'
import { MainMap } from './components/MainMap/MainMap'
import { NavBar } from './components/NavBar/NavBar'
import { CssBaseline } from '@material-ui/core'
import { getFilterMeetings } from './utils/get_filter_meetings'
import { updateMapBounds } from './utils/update_map_bounds'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { InfoPage } from './static_pages/InfoPage'
import { AboutPage } from './static_pages/AboutPage'
import { FaqPage } from './static_pages/FaqPage'
import { ContactPage } from './static_pages/ContactPage'
import { FourOhFour } from './static_pages/FourOhFour'
import { MainMapLoading } from './components/MainMap/components/MainMapLoading'
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export interface AppState {
  filteredMeetings: Meeting[]
  meetings: Meeting[]
}

export interface MainMapState {
  center: {
    lat: number
    lng: number
  }
  defaultZoom: number
  map?: any
  maps?: any
}

const App: React.FC = () => {
  const initialAppState: AppState = {
    filteredMeetings: [],
    meetings: [],
  }

  const initialMainMapState: MainMapState = {
    center: { lat: 0, lng: 0 },
    defaultZoom: 11,
  }
  
  const [appState, setAppState] = React.useState(initialAppState)
  const [mainMapState, setMainMapState] = React.useState(initialMainMapState)

  const updateAllAppState = (meetings: Meeting[]) => {
    setAppState({
      ...appState,
      filteredMeetings: meetings,
      meetings,
    })
    setMainMapState({
      ...mainMapState,
      center: {
        lat: meetings[0].latitude,
        lng: meetings[0].longitude
      },
    })
  }

  const setupMapStateFromApi = async () => {
    const meetings = await fetchMeetings()
    updateAllAppState(meetings)
    // Cache meetings in the client
    localStorage.setItem('quaker-maps-meetings', JSON.stringify(meetings))
    // Set expiration for one week from now
    localStorage.setItem('quaker-maps-data-cache-expiration', JSON.stringify(Date.now() + 604800000))
  }

  // Fetch initial meeting state
  React.useEffect(() => {
    const storedMeetings = localStorage.getItem('quaker-maps-meetings')
    const cacheExpiration = localStorage.getItem('quaker-maps-data-cache-expiration')
    const cacheHasExpired = cacheExpiration && (JSON.parse(cacheExpiration) < Date.now())
    
    if (storedMeetings && !cacheHasExpired) {
      // If local storage already has cached meetings data, use it
      const meetings = JSON.parse(storedMeetings)
      updateAllAppState(meetings)
    } else {
      // Otherwise, fetch meetings data
      setupMapStateFromApi()
    }
  }, [])

  // Re-populate and re-bound map whenever meetings are filtered
  React.useEffect(() => {
    if (mainMapState.map && mainMapState.maps) {
      const map = mainMapState.map
      const maps = mainMapState.maps
      const filteredMeetings = appState.filteredMeetings
      updateMapBounds({ filteredMeetings, map, maps, mainMapState, setMainMapState })
    }
  }, [appState.filteredMeetings])

  const filterMeetings = getFilterMeetings(appState, setAppState)

  const MainMapView = () => appState.meetings.length ? (<MainMap
    apiKey={apiKey || ''}
    appState={appState}
    mainMapState={mainMapState}
    setMainMapState={setMainMapState}
  />) : (
    <MainMapLoading />
  )

  return apiKey ? (
    <Router>
      <CssBaseline />
      <NavBar
        filterMeetings={filterMeetings}
        meetings={appState.meetings}
      />
      <Switch>
        <Route exact path="/" component={MainMapView} />
        <Route exact path="/info" component={InfoPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/frequently-asked-questions" component={FaqPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route component={FourOhFour} />
      </Switch>
    </Router>
  ) : (
    <h1>
      Error: Need Valid API Key
    </h1>
  )
}

export default App

