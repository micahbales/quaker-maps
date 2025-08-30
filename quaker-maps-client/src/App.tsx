import React, { startTransition } from 'react'
import debounce from 'lodash/debounce'
import { ThemeProvider } from '@mui/material/styles'
import { fetchMeetings } from './api/fetch_meetings'
import { MainMap } from './components/MainMap/MainMap'
import { MeetingView } from './components/MeetingView/MeetingView'
import { SiteNav } from './components/SiteNav'
import { UpdateMeetings } from './components/UpdateMeetings/UpdateMeetings'
import { QuakerMapsTheme } from './theme'
import { Meeting } from './types'
import { CssBaseline } from '@mui/material'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import { InfoPage } from './static_pages/InfoPage'
import { FaqPage } from './static_pages/FaqPage'
import { ContactPage } from './static_pages/ContactPage'
import { FourOhFour } from './static_pages/FourOhFour'
import { Loading } from './Loading'
import { measureInitialLoadTime, logPerformanceMetrics, createPerformanceObserver } from './utils/performance'
import { testBackendCompatibility, logBackendTestResults, testMeetingDataStructure } from './utils/backend-compatibility-test'

/**
 * App is the top-level component for Quaker Maps
 * It contains all our routes and is responsible for app-wide state
 */

const sessionStorage = window.sessionStorage
const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const theme = QuakerMapsTheme

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
    // Measure initial load time
    const loadTime = measureInitialLoadTime();
    
    // Set up performance monitoring
    createPerformanceObserver((metrics) => {
        logPerformanceMetrics(metrics);
    });

    const sessionData = sessionStorage.getItem('quaker-maps-meetings-data')
    if (sessionData) {
        const meetings = JSON.parse(sessionData)
        // Use React 18's startTransition for non-urgent state updates
        startTransition(() => {
            setAppState(prevState => ({ ...prevState, meetings }))
            setMeetingsLoaded(true)
        });
        
        // Log performance metrics
        logPerformanceMetrics({ initialLoadTime: loadTime });
    } else {
        // Fetch meetings data if it has not already been cached in session storage
        (async () => {
            const fetchStartTime = performance.now();
            
            // Test backend compatibility
            const backendResults = await testBackendCompatibility();
            logBackendTestResults(backendResults);
            
            const response = await fetchMeetings('https://quaker-maps.s3-us-west-1.amazonaws.com/meetings.json')
            const meetings = [ ...response.britain, ...response.north_america ]
            const fetchEndTime = performance.now();
            
            // Test meeting data structure compatibility
            testMeetingDataStructure(meetings);
            
            // Use React 18's automatic batching for multiple state updates
            startTransition(() => {
                setAppState(prevState => ({ ...prevState, meetings }))
                setMeetingsLoaded(true)
            });
            
            sessionStorage.setItem('quaker-maps-meetings-data', JSON.stringify(meetings))
            
            // Log performance metrics including fetch time
            logPerformanceMetrics({ 
                initialLoadTime: loadTime,
                mapRenderTime: fetchEndTime - fetchStartTime
            });
        })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <ThemeProvider theme={theme}>
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
          <Routes>
            <Route path="/" element={<MainMapView />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/about" element={<FaqPage />} />
            <Route path="/frequently-asked-questions" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/update" element={<UpdateMeetingsView />} />
            <Route path="/meeting/:slug" element={<MeetingView meetings={appState.meetings}/>} />
            <Route path="*" element={<FourOhFour />} />
          </Routes>
        </Router>
      </ThemeProvider>
  ): (
      <Loading />
  )
}

export default App
