import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ReactGA from 'react-ga'

// Google Analytics keeps track of pages that users visit
const trackingId: string | undefined = process.env.REACT_APP_GA_TRACKING_ID
if (trackingId) {
    ReactGA.initialize(trackingId)
    ReactGA.pageview(window.location.pathname + window.location.search)
}

// Mount the App
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
