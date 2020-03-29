import React from 'react'
import debounce from 'lodash/debounce'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { fetchMeetings } from './api/fetch_meetings'
import { MainMap } from './components/MainMap/MainMap'
import { MeetingView } from './components/MeetingView/MeetingView'
import { SiteNav } from './components/SiteNav'
import { UpdateMeetings } from './components/UpdateMeetings/UpdateMeetings'
import { QuakerMapsTheme } from './theme'
import { Meeting } from './types'
import { CssBaseline } from '@material-ui/core'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { InfoPage } from './static_pages/InfoPage'
import { FaqPage } from './static_pages/FaqPage'
import { ContactPage } from './static_pages/ContactPage'
import { FourOhFour } from './static_pages/FourOhFour'
import { Loading } from './Loading'

/**
 * App is the top-level component for Quaker Maps
 * It contains all our routes and is responsible for app-wide state
 */

const sessionStorage = window.sessionStorage
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const theme = createMuiTheme(QuakerMapsTheme)

export interface AppState {
  filteredMeetings: Meeting[]
  meetings: Meeting[]
}

const initialAppState: AppState = {
    filteredMeetings: [],
    meetings: [],
}

const App: React.FC = () => {
  const [appState, setAppState] = React.useState(initialAppState)
  const isViewingMainMap = window.location.pathname === '/'
  const [navMenuIsOpen, setNavMenuIsOpen] = React.useState(isViewingMainMap)
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 960)
  const [meetingsLoaded, setMeetingsLoaded] = React.useState(false)
  // NavMenu will cover the full screen in mobile, otherwise just 250px
  const navMenuWidth = isMobile ? '100%' : '250px'
  // Offset the main navigation and MainMap by the width of the NavMenu
  const navMargin = navMenuIsOpen ? navMenuWidth : '0px'
  // Reduce width of MainMap by the width of the open NavMenu
  // (otherwise, we end up with a map that is wider than the viewport)
  const mainMapWidth = navMenuIsOpen ? `calc(100% - ${navMenuWidth}` : '100%'

React.useEffect(() => {
    const sessionData = sessionStorage.getItem('quaker-maps-meetings-data')
    if (sessionData) {
        const meetings = JSON.parse(sessionData)
        setAppState({ ...appState, meetings })
        setMeetingsLoaded(true)
    } else {
        // Fetch meetings data if it has not already been cached in session storage
        (async () => {
            const meetings = await fetchMeetings('https://quaker-maps.s3-us-west-1.amazonaws.com/meetings.json')
            await setAppState({ ...appState, meetings })
            sessionStorage.setItem('quaker-maps-meetings-data', JSON.stringify(meetings))
            setMeetingsLoaded(true)
        })()
    }
}, [])

  window.onresize = debounce(() => {
      if (window.innerWidth < 960) {
          setIsMobile(true)
      } else {
          setIsMobile(false)
      }
  }, 100)

  if (!apiKey) return (<h1>Error: Google Maps API Key Is Required</h1>)

  const MainMapView = () => (
      <MainMap
          apiKey={apiKey || ''}
          appState={appState}
          width={mainMapWidth}
          marginLeft={navMargin}
      />
  )

  const UpdateMeetingsView = () => (
      <UpdateMeetings
          meetings={appState.meetings}
      />
  )

  return meetingsLoaded ? (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <SiteNav
              appState={appState}
              setAppState={setAppState}
              isViewingMainMap={isViewingMainMap}
              navMenuIsOpen={navMenuIsOpen}
              setNavMenuIsOpen={setNavMenuIsOpen}
              marginLeft={navMargin}
              navMenuWidth={navMenuWidth}
          />
          <Switch>
            <Route exact path="/" component={MainMapView} />
            <Route exact path="/info" component={InfoPage} />
            <Route exact path="/about" component={FaqPage} />
            <Route exact path="/frequently-asked-questions" component={FaqPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/update" component={UpdateMeetingsView} />
            <Route path="/meeting/:slug" children={<MeetingView meetings={appState.meetings}/>} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </MuiThemeProvider>
  ): (
      <Loading />
  )
}

export default App
