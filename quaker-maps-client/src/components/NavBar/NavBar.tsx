import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import { NavMenu } from './components/NavMenu/NavMenu'
import { Meeting } from '../../types'
import React from 'react'

interface NavBarProps {
    filterMeetings: any
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
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Quaker Maps
                        </Typography>
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
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))
