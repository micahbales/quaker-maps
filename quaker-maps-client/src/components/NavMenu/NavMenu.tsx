import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItemText,
    makeStyles,
    MenuItem,
    OutlinedInput,
    Select
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import { QuakerMapsTheme } from '../../theme'
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
        lgbt_affirmings: ['', 'true', 'false'],
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
    })

    const [selectValues, setSelectValues] = React.useState<NavMenuSelectValues>({
        branch: [],
        lgbt_affirming: '',
        state: '',
        worship_style: [],
        yearly_meeting: [],
    })

    const updateMeetingsOnMap = (selectValues: NavMenuSelectValues) => () => filterMeetings(selectValues)

    const updateSelectValuesAndFilterMeetings = (name: string, selection: string | string[], initialLoad = false) => {
        const originalValues = selectValues
        // Sanitize selection string[] for empty strings and other useless non-values
        if (Array.isArray(selection)) {
            selection = selection.reduce((arr: string[], val: string) => {
                if (val) {
                    arr.push(val)
                }
                return arr
            }, [])
        }
        const newSelectValues = {
            ...originalValues,
            [name as string]: selection,
        }
        setSelectValues(newSelectValues)

        /**
         * When we first load the MainMap, we have to make a special call to populate the map
         * After this, updateMeetingsOnMap is only called by the onBlur method of Select dropdowns
         */
        if (initialLoad) {
            updateMeetingsOnMap(newSelectValues)()
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
            updateSelectValuesAndFilterMeetings('yearly_meeting', [randomYearlyMeeting], true)
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, b: any) => {
        const name: string = event.target.name || ''
        const value = event.target.value as string | string[]
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
                    const isMulti = Array.isArray(selectValues[selectKey])
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
                                multiple={isMulti}
                                // renderValue determines which value is displayed in the select box when not focused
                                renderValue={((selected) => Array.isArray(selected) ? (selected as string[]).join(', ') : selected as string)}
                            >
                                {Object.values(selectTitles[`${selectKey}s` as NavMenuSelectTitleKeys]).map((name: string, index: number) =>
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
            <Button onClick={updateMeetingsOnMap(selectValues)} className={classes.button}>Update Map</Button>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 50,
    },
    button: {
      backgroundColor: QuakerMapsTheme.palette.primary[500],
      color: 'white',
      marginLeft: '8px',
      maxWidth: 230,
      width: 230,
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
