import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { MainMap } from './components/MainMap/MainMap'
import { MeetingView } from './components/MeetingView/MeetingView'
import { navMenuWidth } from './components/NavMenu/NavMenu'
import { SiteNav } from './components/SiteNav'
import { QuakerMapsTheme } from './theme'
import { Meeting } from './types'
import { CssBaseline } from '@material-ui/core'
import { updateMapBounds } from './utils/update_map_bounds'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { InfoPage } from './static_pages/InfoPage'
import { FaqPage } from './static_pages/FaqPage'
import { ContactPage } from './static_pages/ContactPage'
import { FourOhFour } from './static_pages/FourOhFour'
import { MainMapLoading } from './components/MainMap/components/MainMapLoading'
import * as data from './data/meetings.json'

const theme = createMuiTheme(QuakerMapsTheme);

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const meetings: Meeting[] = data.meetings

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

export const initialMainMapState: MainMapState = {
  // If there are no meetings, center map on North America and zoom out
  center: { lat: 39.8283, lng: -98.5795 },
  defaultZoom: 4,
}

const App: React.FC = () => {
  const initialAppState: AppState = {
    filteredMeetings: meetings,
    meetings,
  }

  const [appState, setAppState] = React.useState(initialAppState)
  const [mainMapState, setMainMapState] = React.useState(initialMainMapState)
  const isViewingMainMap = window.location.pathname === '/'
  const [navMenuIsOpen, setNavMenuIsOpen] = React.useState(isViewingMainMap)

  // Re-populate and re-bound map whenever meetings are filtered
  React.useEffect(() => {
    if (mainMapState.map && mainMapState.maps) {
      const map = mainMapState.map
      const maps = mainMapState.maps
      const filteredMeetings = appState.filteredMeetings
      updateMapBounds({ filteredMeetings, map, maps, mainMapState, setMainMapState })
    }
  }, [appState.filteredMeetings])



  const MainMapView = () => appState.meetings.length ? (<MainMap
    apiKey={apiKey || ''}
    appState={appState}
    mainMapState={mainMapState}
    setMainMapState={setMainMapState}
    marginLeft={navMenuIsOpen ? navMenuWidth : '0px'}
  />) : (
    <MainMapLoading />
  )

  return apiKey ? (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <SiteNav
              appState={appState}
              setAppState={setAppState}
              isViewingMainMap={isViewingMainMap}
              navMenuIsOpen={navMenuIsOpen}
              setNavMenuIsOpen={setNavMenuIsOpen}
          />
          <Switch>
            <Route exact path="/" component={MainMapView} />
            <Route exact path="/info" component={InfoPage} />
            <Route exact path="/about" component={FaqPage} />
            <Route exact path="/frequently-asked-questions" component={FaqPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route path="/meeting/:slug" children={<MeetingView meetings={appState.meetings}/>} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </MuiThemeProvider>
  ) : (
    <h1>
      Error: Need Valid API Key
    </h1>
  )
}

export default App
