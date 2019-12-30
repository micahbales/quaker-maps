import { makeStyles } from '@material-ui/core'
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { MapMarker } from '../MapMarker/MapMarker'
import { updateMapBounds } from '../../utils/update_map_bounds'
import { AppState, initialMainMapState, MainMapState } from '../../App'
import { Meeting } from '../../types'

/**
 * MainMap is the primary map of meetings that is displayed on the home page
 */

interface MainMapProps {
    apiKey: string
    appState: AppState
    mainMapState: MainMapState
    setMainMapState: (mainMapState: MainMapState) => void
    marginLeft: string
}

export const MainMap: React.FC<MainMapProps> = ({
    apiKey,
    appState,
    marginLeft
}) => {
    const classes = useStyles()
    const [mainMapState, setMainMapState] = React.useState(initialMainMapState)
    return (
        <div className={classes.root} style={{ marginLeft }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                center={mainMapState.center}
                defaultZoom={mainMapState.defaultZoom}
                // Populate and bound map with meetings
                onGoogleApiLoaded={({ map, maps }) => {
                    const filteredMeetings = appState.filteredMeetings
                    updateMapBounds({ 
                        filteredMeetings,
                        map, 
                        maps, 
                        setMainMapState, 
                        mainMapState 
                    })
                }}
                /**
                 * google-maps-react utils API doesn't currently have typings available,
                 * so we're bypassing the library to directly set bounds on the Google Maps API,
                 * as recommended by the library project owner:
                 * https://github.com/google-map-react/google-map-react/issues/753#issuecomment-493267236
                 */
                yesIWantToUseGoogleMapApiInternals={true}
            >
                {appState.filteredMeetings.map((meeting: Meeting, i) => (
                    <MapMarker
                        lat={meeting.latitude}
                        lng={meeting.longitude}
                        meeting={meeting}
                        key={i}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: '93vh',
        position: 'static',
        width: '100%',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}))
