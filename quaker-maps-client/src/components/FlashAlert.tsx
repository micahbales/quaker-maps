import React, { SyntheticEvent } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import WarningIcon from '@mui/icons-material/Warning'
import { Box } from '@mui/material'
import { QuakerMapsTheme } from '../theme'
import { AlertVariants } from '../types'

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

const AlertWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ className, message, onClose, variant, ...other }, ref) => {
    const Icon = variantIcon[variant]

    const getBackgroundColor = () => {
      switch (variant) {
        case 'success':
          return QuakerMapsTheme.palette.success.main
        case 'error':
          return QuakerMapsTheme.palette.error.main
        case 'info':
          return QuakerMapsTheme.palette.info.main
        case 'warning':
          return QuakerMapsTheme.palette.warning.main
        default:
          return QuakerMapsTheme.palette.success.main
      }
    }

    return (
      <SnackbarContent
        sx={{ backgroundColor: getBackgroundColor() }}
        className={className || ''}
        aria-describedby="client-snackbar"
        message={
          <Box
            id="client-snackbar"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon
              sx={{
                fontSize: 20,
                opacity: 0.9,
                marginRight: 1,
              }}
            />
            {message}
          </Box>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>,
        ]}
        ref={ref}
        {...other}
      />
    )
  }
)

interface SnackbarAlertProps {
  closeTimeout?: number
  horizontal: 'left' | 'right' | 'center'
  message: string
  variant?: AlertVariants
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
  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
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
      TransitionProps={{
        timeout: 0,
      }}
    >
      <AlertWrapper onClose={handleClose} variant={variant || 'success'} message={message} />
    </Snackbar>
  )
}
