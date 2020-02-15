import { createStyles, FormControl, List, makeStyles, TextField, Theme } from '@material-ui/core'
import React from 'react'
import { SubmitterDetails } from '../types'

/**
 * SubmitterDetailsForm takes details about the person submitting a meeting update request
 */

interface SubmitterDetailsFormProps {
    submitterDetails: SubmitterDetails
    handleSubmitterDetailsChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void
}

export const SubmitterDetailsForm = ({
    submitterDetails,
    handleSubmitterDetailsChange,
}: SubmitterDetailsFormProps) => {
    const classes = useStyles()

    return (
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
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 225,
        },
    }),
)
