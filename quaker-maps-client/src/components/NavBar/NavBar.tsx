import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { AppState } from '../../App'
import { FlashAlert } from '../FlashAlert'
import { NavMenu } from './components/NavMenu/NavMenu'
import { SelectValues } from '../../types'
import React from 'react'

/**
 * NavBar is the main navigation bar running across the top of Quaker Maps
 */

interface NavBarProps {
    filterMeetings: (selectValues: SelectValues) => void
    appState: AppState
}

export const NavBar: React.FC<NavBarProps> = ({
    filterMeetings,
    appState,
}) => {
    const classes = useStyles()
    const isViewingMainMap = window.location.pathname === '/'
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setDrawerIsOpen(open)
    }
    return (
        <>
            <Drawer open={drawerIsOpen} onClose={toggleDrawer(false)} variant="persistent">
                {/* Don't render NavMenu until/unless we have meetings; we need meetings to populate our form fields */}
                {appState.meetings.length > 0 &&
                    <NavMenu
                        filterMeetings={filterMeetings}
                        meetings={appState.meetings}
                        setDrawerIsOpen={setDrawerIsOpen}
                    />
                }
            </Drawer>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        { /* Only show this button if we're on the root path - the MainMap view */
                            isViewingMainMap &&
                            <Tooltip title="Filter Meetings">
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        <Link href="/" className={classes.homeButton}>
                            Quaker Maps
                        </Link>

                        <Button
                            variant="contained"
                            href="/info" 
                            color={window.location.pathname === '/info' ? 'secondary' : 'primary'}
                            className={classes.button}
                        >
                            Quakers?
                        </Button>
                        <Button
                            variant="contained"
                            href="/frequently-asked-questions" 
                            color={window.location.pathname === '/frequently-asked-questions' ? 'secondary' : 'primary'}
                            className={classes.button}
                        >
                            FAQ
                        </Button>
                        <Button
                            variant="contained"
                            href="/contact" 
                            color={window.location.pathname === '/contact' ? 'secondary' : 'primary'}
                            className={classes.button}
                        >
                            Contact
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>

            {/* Alert user if they have selected invalid search criteria */}
            {drawerIsOpen && isViewingMainMap && appState.filteredMeetings.length === 0 && (
                <FlashAlert horizontal="center" vertical="bottom" variant="warning" closeTimeout={10000} message={
                    'No meetings matched your search results. Try a different set of criteria.'
                }/>
            )}
        </>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '65px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    homeButton: {
        color: '#fff',
        flexGrow: 1,
        fontSize: 18,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    button: {
        margin: '0px 5px'
    }
}))
