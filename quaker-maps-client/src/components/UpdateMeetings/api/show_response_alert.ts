import { AlertStatus } from '../types'
import { initialAlertStatus } from '../utils/initial_values'

/**
 * showResponseAlert consumes the response from a sendUpdateMeetingRequest call to the API,
 * evaluates the response, and displays the appropriate alert
 */

interface ShowResponseAlertProps {
    response: Response
    setAlertStatus: (status: AlertStatus) => void
    alertTimeout: number
    resetForm: () => void
}

export const showResponseAlert = ({
    response,
    setAlertStatus,
    alertTimeout,
    resetForm
}: ShowResponseAlertProps) => {
    if (response.ok) {
        // Show success message
        setAlertStatus({
            show: true,
            message: 'Your request has been submitted! If you provided your email, we\'ll confirm if we accept your changes',
            variant: undefined
        })
        resetForm()
    } else {
        // Show error messgae
        setAlertStatus({
            show: true,
            message: 'There was a problem sending your request. If this problem continues, please email admin@quakermaps.com',
            variant: 'warning'
        })
    }
    // Once the alert has closed, make it possible to open it again
    setTimeout(
        () => setAlertStatus(initialAlertStatus),
        alertTimeout + 1000
    )
}
