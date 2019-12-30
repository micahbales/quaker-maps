import React, { SyntheticEvent } from 'react'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { QuakerMapsTheme } from '../theme'

/**
 * FlashAlert is an alert message that is displayed temporarily on the screen
 */

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

export interface Props {
    className?: string
    message?: string
    onClose?: () => void
    variant: keyof typeof variantIcon
}

const AlertWrapper: React.FC<Props> = ({
   className,
   message,
   onClose,
   variant,
   ...other
}) => {
    const classes = useStyles()
    const Icon = variantIcon[variant]

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    )
}

interface SnackbarAlertProps {
    closeTimeout?: number
    horizontal: 'left' | 'right' | 'center'
    message: string
    variant?: 'success' | 'error' | 'info' | 'warning'
    vertical: 'bottom' | 'top'
}

export const FlashAlert: React.FC<SnackbarAlertProps> = ({
    closeTimeout,
    horizontal,
    message,
    variant,
    vertical,
}) => {
    const [open, setOpen] = React.useState(true)
    const timeout = closeTimeout || 6000
    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical,
                horizontal,
            }}
            open={open}
            autoHideDuration={timeout}
            onClose={handleClose}
        >
            <AlertWrapper
                onClose={handleClose}
                variant={variant || 'success'}
                message={message}
            />
        </Snackbar>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: QuakerMapsTheme.palette.success[500],
    },
    error: {
        backgroundColor: QuakerMapsTheme.palette.secondary[500]
    },
    info: {
        backgroundColor: QuakerMapsTheme.palette.info[500]
    },
    warning: {
        backgroundColor: QuakerMapsTheme.palette.warning[500]
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))
