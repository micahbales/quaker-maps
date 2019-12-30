import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { MainMap } from './components/MainMap/MainMap'
import { MeetingView } from './components/MeetingView/MeetingView'
import { navMenuWidth } from './components/NavMenu/NavMenu'
import { SiteNav } from './components/SiteNav'
import { QuakerMapsTheme } from './theme'
import { Meeting } from './types'
import { CssBaseline } from '@material-ui/core'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { InfoPage } from './static_pages/InfoPage'
import { FaqPage } from './static_pages/FaqPage'
import { ContactPage } from './static_pages/ContactPage'
import { FourOhFour } from './static_pages/FourOhFour'
import { MainMapLoading } from './components/MainMap/components/MainMapLoading'
import * as data from './data/meetings.json'

/**
 * App is the top-level component for Quaker Maps
 * It contains all our routes and is responsible for app-wide state
 */

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const meetings: Meeting[] = data.meetings
const theme = createMuiTheme(QuakerMapsTheme);

export interface AppState {
  filteredMeetings: Meeting[]
  meetings: Meeting[]
}

const initialAppState: AppState = {
    filteredMeetings: meetings,
    meetings,
}

const App: React.FC = () => {
  const [appState, setAppState] = React.useState(initialAppState)
  const isViewingMainMap = window.location.pathname === '/'
  const [navMenuIsOpen, setNavMenuIsOpen] = React.useState(isViewingMainMap)

  if (!apiKey) return (<h1>Error: Google Maps API Key Is Invalid</h1>)

  const MainMapView = () => appState.meetings.length ? (
      <MainMap
        apiKey={apiKey || ''}
        appState={appState}
        marginLeft={navMenuIsOpen ? navMenuWidth : '0px'}
      />
  ) : (
    <MainMapLoading />
  )

  return (
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
  )
}

export default App
