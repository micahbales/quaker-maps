import {
    FormControl,
    InputLabel,
    List,
    makeStyles,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from '@material-ui/core'
import React from 'react'
import { Meeting } from '../../../types'
import { getTitles } from '../../NavMenu/utils/get_titles'
import {
    UpdateMeetingsInputTitleKeys,
    UpdateMeetingsInputValues,
    UpdateMeetingsSelectKeys,
    UpdateMeetingsSelectTitleKeys,
    UpdateMeetingsSelectValues,
    UpdateMeetingsTitles
} from '../types'
import { initialInputValues, initialSelectValues } from '../utils/initial_values'

/**
 * MeetingDetailsForm takes details about a meeting that should be updated
 */

interface MeetingDetailsFormProps {
    meetingKey: number
    handleMeetingUpdateChange: (key: number, updatedMeeting: object) => void
    meetings: Meeting[]
}

export const MeetingDetailsForm: React.FC<MeetingDetailsFormProps> = ({
    meetingKey,
    handleMeetingUpdateChange,
    meetings
 }) => {

    const classes = useStyles()

    const [selectValues, setSelectValues] = React.useState<UpdateMeetingsSelectValues>(initialSelectValues)
    const [inputValues, setInputValues] = React.useState<UpdateMeetingsInputValues>(initialInputValues)

    const [selectTitles] = React.useState<UpdateMeetingsTitles>({
        accessibilitys: getTitles(meetings, 'accessibility'),
        branchs: getTitles(meetings, 'branch'),
        lgbt_affirmings: ['', 'true', 'false'],
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
    })

    const updateSelectValues = (name: string, value: string | string[], values?: UpdateMeetingsSelectValues) => {
        const originalValues = values || selectValues
        const newSelectValues = {
            ...originalValues,
            [name as string]: value,
        }
        setSelectValues(newSelectValues)
        handleMeetingUpdateChange(meetingKey, { ...inputValues, ...newSelectValues})
    }

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name: string = event.target.name || ''
        const value = event.target.value as string[]

        updateSelectValues(name, value)
    }

    const updateInputValues = (name: string, value: string) =>
        setInputValues({ ...inputValues, [name as string]: value })

    const handleInputChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name: string = event.target.name || ''
        const value: string = String(event.target.value)
        const updatedMeetingValues = { ...selectValues, ...inputValues, [name]: value }
        updateInputValues(name, value)
        handleMeetingUpdateChange(meetingKey, updatedMeetingValues)
    }

    return (
        <>
            <h2>{inputValues.title || `Meeting to Update #${meetingKey + 1}`}</h2>

            <List style={{width: '75%'}}>
                {Object.keys(inputValues).map((key: string, index: number) => {
                    const selectKey = key as UpdateMeetingsInputTitleKeys
                    return (
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            key={index}
                            fullWidth={true}
                        >
                            <TextField
                                name={selectKey}
                                onChange={handleInputChange}
                                value={inputValues[selectKey]}
                                label={selectKey}
                                id={`standard-${selectKey}-basic-${meetingKey}`}
                            />
                        </FormControl>
                    )
                })}
            </List>

            <List style={{width: '75%'}}>
                {Object.keys(selectValues).map((key: string, index: number) => {
                    const selectKey = key as UpdateMeetingsSelectKeys
                    const isMulti = Array.isArray(selectValues[selectKey])
                    return (
                        <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            key={index}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor={`outlined-${selectKey}-simple`}>
                                {selectKey.replace(/_/g, ' ')}
                            </InputLabel>
                            <Select
                                value={selectValues[selectKey]}
                                multiple={isMulti}
                                onChange={handleSelectChange}
                                input={<OutlinedInput labelWidth={selectKey.length * 7.5} name={selectKey} id={`outlined-${selectKey}-simple`} />}
                            >
                                {Object.values(selectTitles[`${selectKey}s` as UpdateMeetingsSelectTitleKeys]).map((name: string, index: number) => (
                                    <MenuItem value={name} key={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                })}
            </List>
        </>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    }
}))
