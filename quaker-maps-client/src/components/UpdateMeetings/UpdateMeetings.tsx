import { createStyles, makeStyles, Button, Theme } from '@material-ui/core'
import React from 'react'
import Container from '@material-ui/core/Container'
import { FlashAlert } from '../FlashAlert'
import { sendUpdateMeetingRequest } from './api/send_update_meeting_request'
import { showResponseAlert } from './api/show_response_alert'
import { MeetingDetailsForm } from './components/MeetingDetailsForm'
import { SubmitterDetailsForm } from './components/SubmitterDetailsForm'
import {
    AlertStatus,
    MeetingUpdates,
    SubmitterDetails,
    UpdateMeetingsInputValues,
    UpdateMeetingsSelectValues,
    UpdateMeetingsViewProps
} from './types'
import {
    initialAlertStatus,
    initialInputValues,
    initialSelectValues,
    initialSubmitterDetails
} from './utils/initial_values'

export const UpdateMeetings: React.FC<UpdateMeetingsViewProps> = ({
    meetings
}) => {
    const classes = useStyles()

    const [meetingUpdates, setMeetingUpdates] = React.useState<MeetingUpdates>({})
    const [submitterDetails, setSubmitterDetails] = React.useState<SubmitterDetails>(initialSubmitterDetails)
    const [canSubmit, setCanSubmit] = React.useState<boolean>(Object.entries(meetingUpdates).length > 0)
    const [alertStatus, setAlertStatus] = React.useState<AlertStatus>(initialAlertStatus)
    const [selectValues, setSelectValues] = React.useState<UpdateMeetingsSelectValues>(initialSelectValues)
    const [inputValues, setInputValues] = React.useState<UpdateMeetingsInputValues>(initialInputValues)
    const alertTimeout = 10000 // time alert message will stay visible if not manually closed

    const handleMeetingUpdateChange = (meetingKey: string, updatedMeeting: object) => {
        const changedUpdates = meetingUpdates
        changedUpdates[meetingKey] = updatedMeeting
        setMeetingUpdates(changedUpdates)
        setCanSubmit(Object.entries(changedUpdates).length > 0)
    }

    const handleSubmitterDetailsChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name: string = event.target.name || ''
        const value: string = String(event.target.value)
        setSubmitterDetails({ ...submitterDetails, [name as string]: value })
    }

    const resetForm = () => {
        setMeetingUpdates({})
        setSubmitterDetails(initialSubmitterDetails)
        setSelectValues(initialSelectValues)
        setInputValues(initialInputValues)
        setCanSubmit(false)
    }

    const handleSubmit = async () => {
        const response = await sendUpdateMeetingRequest({ meetingUpdates, submitterDetails })
        showResponseAlert({
            response,
            setAlertStatus,
            alertTimeout,
            resetForm
        })
    }

    return (
        <Container maxWidth="lg" style={{ paddingBottom: '50px' }}>
            <h1>Update Meetings</h1>

            <SubmitterDetailsForm
                submitterDetails={submitterDetails}
                handleSubmitterDetailsChange={handleSubmitterDetailsChange}
            />

            <MeetingDetailsForm
                meetingKey={'1'}
                handleMeetingUpdateChange={handleMeetingUpdateChange}
                inputValues={inputValues}
                setInputValues={setInputValues}
                selectValues={selectValues}
                setSelectValues={setSelectValues}
                meetings={meetings}
            />

            <Button
                color="primary"
                disabled={!canSubmit}
                onClick={handleSubmit}
                variant="contained"
                size="large"
                className={classes.margin}
            >
                Submit
            </Button>

            {alertStatus.show && (
                <FlashAlert
                    horizontal="center"
                    vertical="bottom"
                    variant={alertStatus.variant}
                    closeTimeout={alertTimeout}
                    message={alertStatus.message}
                />
            )}
        </Container>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
)
