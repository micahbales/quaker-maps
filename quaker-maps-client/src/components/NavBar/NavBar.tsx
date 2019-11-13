import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { NavMenu, SelectValues } from './components/NavMenu/NavMenu'
import { Meeting } from '../../types'
import React from 'react'

interface NavBarProps {
    filterMeetings: (selectValues: SelectValues) => boolean
    meetings: Meeting[]
}

export const NavBar: React.FC<NavBarProps> = ({
    filterMeetings,
    meetings,
}) => {
    const classes = useStyles()
    const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setDrawerIsOpen(open)
    }
    return (
        <>
            <Drawer open={drawerIsOpen} onClose={toggleDrawer(false)} variant="persistent">
                {/* Don't render NavMenu until meetings have been fetched, because we need meetings to populate our form fields */}
                {meetings.length > 0 && 
                <NavMenu
                    filterMeetings={filterMeetings}
                    meetings={meetings}
                    setDrawerIsOpen={setDrawerIsOpen}
                />}
            </Drawer>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        { /* Only show this button if we're on the root path - the MainMap view */
                            window.location.pathname === '/' && 
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
