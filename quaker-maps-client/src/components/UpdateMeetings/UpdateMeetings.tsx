import {
    createStyles,
    makeStyles,
    Button,
    Theme,
    Icon,
    IconButton,
    CircularProgress,
    Box,
    Card
} from '@material-ui/core'
import React from 'react'
import Container from '@material-ui/core/Container'
import cloneDeep from 'lodash/cloneDeep'
import { FlashAlert } from '../FlashAlert'
import { sendUpdateMeetingRequest } from './api/send_update_meeting_request'
import { showResponseAlert } from './api/show_response_alert'
import { MeetingDetailsForm } from './components/MeetingDetailsForm'
import { SubmitterDetailsForm } from './components/SubmitterDetailsForm'
import {
    AlertStatus,
    SubmitterDetails,
    UpdateMeetingsViewProps
} from './types'
import {
    initialAlertStatus,
    initialMeetingUpdates,
    initialSubmitterDetails
} from './utils/initial_values'

/**
 * UpdateMeetings is the view-level component that is displayed for the /update route
 * This view allows the user to submit one or more meetings to be updated by the site maintainers
 */

export const UpdateMeetings: React.FC<UpdateMeetingsViewProps> = ({
    meetings
}) => {
    const classes = useStyles()

    const [formSubmitting, setFormSubmitting] = React.useState<Boolean>(false)
    const [meetingUpdates, setMeetingUpdates] = React.useState<object[]>(initialMeetingUpdates)
    const [submitterDetails, setSubmitterDetails] = React.useState<SubmitterDetails>(initialSubmitterDetails)
    const [canSubmit, setCanSubmit] = React.useState<boolean>(Object.entries(meetingUpdates).length > 0) // TODO: use a .every to make sure each form complies
    const [alertStatus, setAlertStatus] = React.useState<AlertStatus>(initialAlertStatus)
    const alertTimeout = 10000 // time alert message will stay visible if not manually closed

    const handleMeetingUpdateChange = (meetingKey: number, updatedMeeting: object) => {
        const changedUpdates: object[] = meetingUpdates
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
        setMeetingUpdates(initialMeetingUpdates)
        setSubmitterDetails(initialSubmitterDetails)
        setCanSubmit(false)
        setFormSubmitting(false)
    }

    const handleSubmit = async () => {
        const meetings = cloneDeep(meetingUpdates)
        await setMeetingUpdates([])
        setFormSubmitting(true)

        const response = await sendUpdateMeetingRequest({ meetingUpdates: meetings, submitterDetails })
        showResponseAlert({
            response,
            setAlertStatus,
            alertTimeout,
            resetForm
        })
    }

    const addUpdateForm = () => {
        const updates = cloneDeep(meetingUpdates)
        updates.push({})
        setMeetingUpdates(updates)
    }

    return (
        <Container maxWidth="lg" style={{ paddingBottom: '50px' }}>
            <h1 className={classes.header}>Update Meetings</h1>

            {formSubmitting ? (
                <>
                    <CircularProgress variant="indeterminate" />
                </>
            ) : (
                <>
                    <Card className={classes.formCard}>
                        <SubmitterDetailsForm
                            submitterDetails={submitterDetails}
                            handleSubmitterDetailsChange={handleSubmitterDetailsChange}
                        />
                    </Card>

                    {meetingUpdates.map((meeting, index) =>
                        <Card className={classes.formCard} key={index}>
                            <MeetingDetailsForm
                                key={index}
                                meetingKey={index}
                                handleMeetingUpdateChange={handleMeetingUpdateChange}
                                meetings={meetings}
                            />
                        </Card>)}

                    <Box display="flex" className={classes.addButton}>
                        <IconButton onClick={addUpdateForm}>
                            <Icon color="primary" fontSize="large">add_circle</Icon>
                        </IconButton>
                        <p>Add Another Meeting</p>
                    </Box>

                    <Button
                        color="primary"
                        disabled={!canSubmit}
                        onClick={handleSubmit}
                        variant="contained"
                        size="large"
                        className={classes.submitButton}
                    >
                        Submit
                    </Button>
                </>
            )}

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
        addButton: {
            fontSize: 18,
            fontWeight: 500,
        },
        formCard: {
            margin: theme.spacing(2),
            padding: 20,
        },
        header: {
            margin: '24px 8px 18px 8px',
        },
        submitButton: {
            margin: theme.spacing(1),
        },
    }),
)
