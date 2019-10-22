import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { getTitles } from './utils/get_titles'
import { Meeting } from '../../../../types'
import sample from 'lodash/sample'
import React from 'react'


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

    const [selectTitles] = React.useState({
        branchs: getTitles(meetings, 'branch'),
        lgbt_affirmings: ['true', 'false'],
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
    })

    const [selectValues, setSelectValues] = React.useState({
        branch: '',
        lgbt_affirming: '',
        state: '',
        worship_style: '',
        yearly_meeting: '',
    })

    const updateSelectValuesAndFilterMeetings = (name: string | undefined, value: unknown) => {
        const newSelectValues = {
            ...selectValues,
            [name as string]: value,
        }
        setSelectValues(newSelectValues)
        filterMeetings(newSelectValues)
    }

    /**
     * Display a random yearly meeting on initial load
     * This is helpful both because it makes the page much faster to load,
     * and also because a smaller number of meetings is easier for a visitor to reason about
     * */ 
    React.useEffect(() => {
        const randomYearlyMeeting: string | undefined = sample(getTitles(meetings, 'yearly_meeting'))
        updateSelectValuesAndFilterMeetings('yearly_meeting', randomYearlyMeeting)
    }, [])

    function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        const name: string | undefined = event.target.name 
        const value: unknown | undefined = event.target.value
        updateSelectValuesAndFilterMeetings(name, value)
    }

    return (
        <div
            className={classes.list}
            role="presentation"
        >
            <div className={classes.drawerHeader}>
                <h1 className={classes.header}>Filter Meetings</h1>
                <IconButton onClick={() => setDrawerIsOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                {Object.keys(selectValues).map((title: string, index: number) => (
                    <FormControl variant="outlined" className={classes.formControl} key={index}>
                        <InputLabel htmlFor={`outlined-${title}-simple`}>
                            {title.replace(/_/g, ' ')}
                        </InputLabel>
                        <Select
                            // TODO: Figure out what this TypeScript error is all about
                            // @ts-ignore : 'expression of type 'string' can't be used to index selectValues'
                            value={selectValues[title]}
                            onChange={handleChange}
                            input={<OutlinedInput labelWidth={title.length * 7.5} name={title} id={`outlined-${title}-simple`} />}
                            className={classes.select}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            // @ts-ignore : 'expression of type 'string' can't be used to index selectTitles'
                            {Object.values(selectTitles[`${title}s`]).map((name: string, index: number) => (
                                <MenuItem value={name} key={index}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
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
