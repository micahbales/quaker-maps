import { createStyles, makeStyles, Button, List, Theme, TextField, FormControl } from '@material-ui/core'
import React from 'react'
import Container from '@material-ui/core/Container'
import { MeetingDetailsForm } from './components/MeetingDetailsForm'
import {
    MeetingUpdates,
    SubmitterDetails,
    UpdateMeetingsViewProps
} from './types'

export const UpdateMeetings: React.FC<UpdateMeetingsViewProps> = ({
    meetings
}) => {
    const classes = useStyles()

    const [submitterDetails, setSubmitterDetails] = React.useState<SubmitterDetails>({})
    const [meetingUpdates, setMeetingUpdates] = React.useState<MeetingUpdates>({})
    const [canSubmit, setCanSubmit] = React.useState<boolean>(Object.entries(meetingUpdates).length > 0)

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

    const handleSubmit = async () => {
        const response = fetch('https://us-central1-quaker-maps.cloudfunctions.net/api/update_request', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({submitterDetails, meetingUpdates}) // body data type must match "Content-Type" header
        })
        const responseJSON = await response
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
                            name={'Name'}
                            placeholder="Your full name"
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
                            name={'Email'}
                            placeholder="Your email"
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
                            name={'Authority'}
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
