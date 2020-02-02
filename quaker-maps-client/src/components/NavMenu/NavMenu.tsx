import {
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
import {
    NavMenuProps,
    NavMenuSelectKeys,
    NavMenuSelectTitleKeys,
    NavMenuSelectTitles,
    NavMenuSelectValues
} from './types'
import { getTitles } from './utils/get_titles'
import sample from 'lodash/sample'
import React from 'react'

/**
 * NavMenu is the left-hand menu with select dropdowns for filtering meetings by criteria
 */

export const NavMenu: React.FC<NavMenuProps> = ({
    filterMeetings,
    meetings,
    setDrawerIsOpen,
    navMenuWidth
}) => {
    const classes = useStyles()

    const [selectTitles] = React.useState<NavMenuSelectTitles>({
        branchs: getTitles(meetings, 'branch'),
        lgbt_affirmings: ['true', 'false'],
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
    })

    const [selectValues, setSelectValues] = React.useState<NavMenuSelectValues>({
        branch: '',
        lgbt_affirming: '',
        state: '',
        worship_style: '',
        yearly_meeting: '',
    })

    const updateSelectValuesAndFilterMeetings = (name: string, value: string, values?: NavMenuSelectValues) => {
        const originalValues = values || selectValues
        const newSelectValues = {
            ...originalValues,
            [name as string]: value,
        }
        filterMeetings(newSelectValues)
        setSelectValues(newSelectValues)
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

    return (
        <div
            className={classes.root}
            role="presentation"
            style={{ width: navMenuWidth }}
        >
            <div className={classes.drawerHeader}>
                <h1 className={classes.header}>Filter Meetings</h1>
                <IconButton onClick={() => setDrawerIsOpen(false)}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <List>
                {Object.keys(selectValues).map((key: string, index: number) => {
                    const selectKey = key as NavMenuSelectKeys
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
                                {Object.values(selectTitles[`${selectKey}s` as NavMenuSelectTitleKeys]).map((name: string, index: number) => (
                                    <MenuItem value={name} key={index}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                })}
            </List>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 50,
    },
    button_invalid: {
        margin: '0 10px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
    },
    select: {
        maxWidth: 230,
        width: 230,
    }
}))
