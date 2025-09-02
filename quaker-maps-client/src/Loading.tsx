import CircularProgress from '@mui/material/CircularProgress'

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
