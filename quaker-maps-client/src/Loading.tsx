import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

/**
 * This spinner is displayed if site data hasn't loaded yet
 */

export const Loading = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25%' 
    }}>
        <CircularProgress style={{ 
            width: 60,
            height: 60,
         }} />
    </div>
)
