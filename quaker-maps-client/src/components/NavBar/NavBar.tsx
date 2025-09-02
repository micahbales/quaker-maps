import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { ChevronRight } from '@mui/icons-material'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { Box } from '@mui/material'
import React from 'react'

/**
 * NavBar is the main navigation bar running across the top of Quaker Maps
 */

interface NavBarProps {
    isViewingMainMap: boolean
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    marginLeft: string
    navMenuIsOpen: boolean
}

export const NavBar: React.FC<NavBarProps> = ({
    isViewingMainMap,
    toggleDrawer,
    marginLeft,
    navMenuIsOpen
}) => {
    return (
        <Box sx={{ marginLeft }}>
            <AppBar position="static">
                <Toolbar>
                    { /* Only show this button if we're on the MainMap view and the NavMenu is closed */
                        isViewingMainMap && !navMenuIsOpen &&
                        <Tooltip title="Filter Meetings">
                            <IconButton 
                                edge="start" 
                                color="inherit" 
                                aria-label="menu" 
                                onClick={toggleDrawer(true)}
                                sx={{ marginRight: 2 }}
                            >
                                <ChevronRight />
                            </IconButton>
                        </Tooltip>
                    }
                    <Link 
                        href="/" 
                        sx={{
                            color: '#fff',
                            flexGrow: 1,
                            fontSize: 18,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none',
                            }
                        }}
                    >
                        Quaker Maps
                    </Link>

                    <Button
                        variant="contained"
                        href="/info"
                        color={window.location.pathname === '/info' ? 'secondary' : 'primary'}
                        sx={{ margin: '0px 5px' }}
                    >
                        Quakers?
                    </Button>
                    <Button
                        variant="contained"
                        href="/frequently-asked-questions"
                        color={window.location.pathname === '/frequently-asked-questions' ? 'secondary' : 'primary'}
                        sx={{ margin: '0px 5px' }}
                    >
                        FAQ
                    </Button>
                    <Button
                        variant="contained"
                        href="/contact"
                        color={window.location.pathname === '/contact' ? 'secondary' : 'primary'}
                        sx={{ margin: '0px 5px' }}
                    >
                        Contact
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


