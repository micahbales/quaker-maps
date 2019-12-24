import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    List,
    makeStyles,
    MenuItem,
    OutlinedInput,
    Select
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { FlashAlert } from '../../../FlashAlert'
import { getTitles } from './utils/get_titles'
import { Meeting, SelectKeys, SelectTitleKeys, SelectTitles, SelectValues } from '../../../../types'
import sample from 'lodash/sample'
import React from 'react'

interface NavMenuProps {
    filterMeetings: (selectValues: SelectValues) => boolean
    meetings: Meeting[]
    setDrawerIsOpen: (option: boolean) => void
}

export const NavMenu: React.FC<NavMenuProps> = ({
    filterMeetings,
    meetings,
    setDrawerIsOpen,
}) => {
    const classes = useStyles()

    const [selectTitles] = React.useState<SelectTitles>({
        branchs: getTitles(meetings, 'branch'),
        lgbt_affirmings: ['true', 'false'],
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
    })

    const initialSelectValues = {
        branch: '',
        lgbt_affirming: '',
        state: '',
        worship_style: '',
        yearly_meeting: '',
    }
    const [selectValues, setSelectValues] = React.useState<SelectValues>(initialSelectValues)

    const initialInvalidSelection = { name: '', value: '' }
    const [invalidSelection, setInvalidSelection] = React.useState<{name: string, value: string}>(initialInvalidSelection)

    const updateSelectValuesAndFilterMeetings = (name: string, value: string, values?: SelectValues) => {
        const originalValues = values || selectValues
        const newSelectValues = {
            ...originalValues,
            [name as string]: value,
        }
        const stateWasUpdated = filterMeetings(newSelectValues)
        if (stateWasUpdated) {
            // Update dropdown values if the selection was possible (updated the filtered meetings)
            setSelectValues(newSelectValues)
        } else {
            // Otherwise, alert the user to the invalid selection and give them an option to reset on that selection
            setInvalidSelection({ name, value })
        }
    }

    /**
     * Display a random yearly meeting on initial load
     * This is helpful both because it makes the page much faster to load,
     * and also because a smaller number of meetings is easier for a visitor to reason about
     * */ 
    React.useEffect(() => {
        const randomYearlyMeeting: string | undefined = sample(getTitles(meetings, 'yearly_meeting'))
        if (randomYearlyMeeting) {
            updateSelectValuesAndFilterMeetings('yearly_meeting', randomYearlyMeeting)
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name: string = event.target.name || ''
        const value: string = String(event.target.value)
        updateSelectValuesAndFilterMeetings(name, value)
    }

    const newSearchFromSingleCriterion = async () => {
        const name = invalidSelection.name
        const value = invalidSelection.value

        await setInvalidSelection(initialInvalidSelection)
        await setSelectValues(initialSelectValues)

        updateSelectValuesAndFilterMeetings(name, value, initialSelectValues)
    }

    return (
        <div
            className={classes.list}
            role="presentation"
        >
            <div className={classes.drawerHeader}>
                <h1 className={classes.header}>Filter Meetings</h1>
                <IconButton onClick={() => setDrawerIsOpen(false)}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <List>
                {Object.keys(selectValues).map((key: string, index: number) => {
                    const selectKey = key as SelectKeys
                    return (
                        <FormControl variant="outlined" className={classes.formControl} key={index}>
                            <InputLabel htmlFor={`outlined-${selectKey}-simple`}>
                                {selectKey.replace(/_/g, ' ')}
                            </InputLabel>
                            <Select
                                value={selectValues[selectKey]}
                                onChange={handleChange}
                                input={<OutlinedInput labelWidth={selectKey.length * 7.5} name={selectKey} id={`outlined-${selectKey}-simple`} />}
                                className={classes.select}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Object.values(selectTitles[`${selectKey}s` as SelectTitleKeys]).map((name: string, index: number) => (
                                    <MenuItem value={name} key={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                })}
            </List>

            {/*Show alert and button when an invalid selection is chosen*/}
            {invalidSelection.value && (
                <>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button_invalid}
                        onClick={newSearchFromSingleCriterion}>
                        Search only {invalidSelection.name.replace(/_/g, ' ')} : {invalidSelection.value}
                    </Button>
                    <FlashAlert variant="error" message={
                        `Adding ${invalidSelection.name.replace(/_/g, ' ')} : ${invalidSelection.value} to your search criteria does not result in any meetings`
                    }/>
                </>
            )}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    button_invalid: {
        margin: '0 10px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
    },
    list: {
        height: 50,
        width: 250,
    },
    select: {
        maxWidth: 230,
        width: 230,
    }
}))
