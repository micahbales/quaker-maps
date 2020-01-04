import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import React from 'react'

/**
 * NavBar is the main navigation bar running across the top of Quaker Maps
 */

interface NavBarProps {
    isViewingMainMap: boolean
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    marginLeft: string
}

export const NavBar: React.FC<NavBarProps> = ({
    isViewingMainMap,
    toggleDrawer,
    marginLeft
}) => {
    const classes = useStyles()
    return (
        <div style={{ marginLeft }}>
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
    )
}

const useStyles = makeStyles(theme => ({
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
