import {
    Checkbox,
    FormControl,
    InputLabel,
    List,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
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

    const theme = useTheme()

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

    const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
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

    // We have to sort our object keys because we can't rely on a consistent order
    // (Found this out the hard way when Safari's JS engine changed the order on the fly when our values were updated)
    const inputKeys = Object.keys(inputValues).sort()
    const selectKeys = Object.keys(selectValues).sort()

    return (
        <>
            <Typography variant="h5" component="h2">
                {inputValues.title || `Meeting to Update #${meetingKey + 1}`}
            </Typography>

            <List style={{width: '75%'}}>
                {inputKeys.map((key: string) => {
                    const selectKey = key as UpdateMeetingsInputTitleKeys
                    return (
                        <FormControl
                            variant="outlined"
                            sx={{
                                margin: theme.spacing(1),
                                minWidth: 225,
                            }}
                            key={selectKey}
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
                {selectKeys.map((key: string) => {
                    const selectKey = key as UpdateMeetingsSelectKeys
                    const isMulti = Array.isArray(selectValues[selectKey])
                    return (
                        <FormControl
                            variant="outlined"
                            sx={{
                                margin: theme.spacing(1),
                                minWidth: 225,
                            }}
                            key={selectKey}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor={`outlined-${selectKey}-simple`}>
                                {selectKey.replace(/_/g, ' ')}
                            </InputLabel>
                            <Select
                                value={selectValues[selectKey]}
                                multiple={isMulti}
                                onChange={handleSelectChange}
                                input={<OutlinedInput name={selectKey} id={`outlined-${selectKey}-simple`} />}
                                // renderValue determines which value is displayed in the select box when not focused
                                renderValue={((selected) => Array.isArray(selected) ? (selected as string[]).join(', ') : selected as string)}
                            >
                                {Object.values(selectTitles[`${selectKey}s` as UpdateMeetingsSelectTitleKeys]).map((name: string, index: number) =>
                                    // Multi-selects get checkboxes; simple selects just text items
                                    isMulti ? (
                                        name &&
                                        <MenuItem value={name} key={index}>
                                            <Checkbox checked={selectValues[selectKey].indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ) : (
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


