import { FormControl, List, TextField, Typography } from '@mui/material'
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

    return (
        <>
            <Typography variant="h5" component="h2">Information About You</Typography>

            <List style={{width: '75%'}}>
                <FormControl
                    variant="outlined"
                    fullWidth={true}
                    sx={{ margin: 1, minWidth: 225 }}
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
                    sx={{ margin: 1, minWidth: 225 }}
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
                    sx={{ margin: 1, minWidth: 225 }}
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


