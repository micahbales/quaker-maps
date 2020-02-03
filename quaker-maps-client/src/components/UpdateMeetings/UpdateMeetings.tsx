import { createStyles, makeStyles, Button, List, Theme, TextField, FormControl } from '@material-ui/core'
import React from 'react'
import Container from '@material-ui/core/Container'
import { FlashAlert } from '../FlashAlert'
import { MeetingDetailsForm } from './components/MeetingDetailsForm'
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
        const response = await fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/update_request', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({submitterDetails, meetingUpdates}) // body data type must match 'Content-Type' header
        })
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

    return (
        <Container maxWidth="lg" style={{ paddingBottom: '50px' }}>
            <h1>Update Meetings</h1>

            <>
                <h2>Information About You</h2>

                <List style={{width: '75%'}}>
                    <FormControl
                        variant="outlined"
                        fullWidth={true}
                        className={classes.formControl}
                    >
                        <TextField
                            name={'name'}
                            placeholder="Your full name"
                            value={submitterDetails.name}
                            onChange={handleSubmitterDetailsChange}
                            label={'Name'}
                        />
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth={true}
                        className={classes.formControl}
                    >
                        <TextField
                            name={'email'}
                            placeholder="Your email"
                            value={submitterDetails.email}
                            onChange={handleSubmitterDetailsChange}
                            label={'Email'}
                        />
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth={true}
                        className={classes.formControl}
                    >
                        <TextField
                            name={'authority'}
                            value={submitterDetails.authority}
                            onChange={handleSubmitterDetailsChange}
                            placeholder="What authorized source are you drawing your information from?"
                            label={'Authority'}
                        />
                    </FormControl>
                </List>
            </>

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 225,
        },
        margin: {
            margin: theme.spacing(1),
        },
    }),
)
