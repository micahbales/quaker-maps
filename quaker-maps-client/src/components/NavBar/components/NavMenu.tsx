import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Meeting } from '../../../types'
import React from 'react'
import uniq from 'lodash/uniq'
import flatten from 'lodash/flatten'
import map from 'lodash/map'


interface NavMenuProps {
    filterMeetings: any
    meetings: Meeting[]
    setDrawerIsOpen: (option: boolean) => void
}

export const NavMenu: React.FC<NavMenuProps> = ({
    filterMeetings,
    meetings,
    setDrawerIsOpen,
}) => {
    const classes = useStyles()
    const [state, setState] = React.useState({
        // Title of every yearly meeting
        yearly_meetings: getYearlyMeetingTitles(meetings),
        // Title of currently selected yearly meeting
        yearly_meeting: '',
    })

    function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        setState(oldValues => ({
            ...oldValues,
            [event.target.name as string]: event.target.value,
        }))
        filterMeetings(event.target.name, event.target.value)
    }

    return (
        <div
            className={classes.list}
            role="presentation"
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => setDrawerIsOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-yearly-meeting-simple">
                        Yearly Meeting
                    </InputLabel>
                    <Select
                        value={state.yearly_meeting}
                        onChange={handleChange}
                        input={<OutlinedInput labelWidth={50} name="yearly_meeting" id="outlined-yearly-meeting-simple" />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {state.yearly_meetings.map((yearlyMeeting: string, index: number) => (
                            <MenuItem value={yearlyMeeting} key={index}>
                                {yearlyMeeting}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </List>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
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
    list: {
        height: 50,
        width: 250,
    },
}))

const getYearlyMeetingTitles = (meetings: Meeting[]) => 
    uniq(flatten(meetings.map((meeting) => map(meeting.yearly_meeting.split(','), (m) => m.trim()))))
