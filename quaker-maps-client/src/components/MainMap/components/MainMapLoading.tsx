import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export const MainMapLoading = () => (
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