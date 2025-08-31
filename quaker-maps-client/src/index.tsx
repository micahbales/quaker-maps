import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga4'

// Google Analytics keeps track of pages that users visit
const trackingId: string | undefined = process.env.REACT_APP_GA_TRACKING_ID
if (trackingId) {
    ReactGA.initialize(trackingId)
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })
}

// Mount the App using React 18's createRoot API
const container = document.getElementById('root')
if (container) {
    const root = createRoot(container)
    root.render(<App />)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
