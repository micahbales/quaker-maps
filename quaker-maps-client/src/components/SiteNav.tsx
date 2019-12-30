import { Drawer } from '@material-ui/core'
import React from 'react'
import { AppState } from '../App'
import { getFilterMeetings } from '../utils/get_filter_meetings'
import { FlashAlert } from './FlashAlert'
import { NavBar } from './NavBar/NavBar'
import { NavMenu, navMenuWidth } from './NavMenu/NavMenu'

/**
 * SiteNav is a container for all the site-wide navigation components for Quaker Maps
 * It includes the NavMenu, NavBar, and flash alerts
 */

interface SiteNavProps {
    appState: AppState
    setAppState: (appState: AppState) => void
    isViewingMainMap: boolean
    navMenuIsOpen: boolean
    setNavMenuIsOpen: (value: boolean) => void
}

export const SiteNav: React.FC<SiteNavProps> = ({
    appState,
    setAppState,
    isViewingMainMap,
    navMenuIsOpen,
    setNavMenuIsOpen,
}) => {
    const filterMeetings = getFilterMeetings(appState, setAppState)
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setNavMenuIsOpen(open)
    }
    return (
        <>
            <Drawer open={navMenuIsOpen} onClose={toggleDrawer(false)} variant="persistent" anchor="left">
                {/* Don't render NavMenu until/unless we have meetings; we need meetings to populate our form fields */}
                {appState.meetings.length > 0 &&
                <NavMenu
                    filterMeetings={filterMeetings}
                    meetings={appState.meetings}
                    setDrawerIsOpen={setNavMenuIsOpen}
                />
                }
            </Drawer>
            <NavBar
                isViewingMainMap={isViewingMainMap}
                toggleDrawer={toggleDrawer}
                marginLeft={navMenuIsOpen ? navMenuWidth : '0px'}
            />
            {/* Alert user if they have selected invalid search criteria */}
            {navMenuIsOpen && isViewingMainMap && appState.filteredMeetings.length === 0 && (
                <FlashAlert horizontal="center" vertical="bottom" variant="warning" closeTimeout={10000} message={
                    'No meetings matched your search results. Try a different set of criteria.'
                }/>
            )}
        </>
    )
}
