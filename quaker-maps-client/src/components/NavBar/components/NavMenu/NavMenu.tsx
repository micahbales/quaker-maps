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

    const [selectTitles, setSelectTitles] = React.useState({
        accessibilitys: getTitles(meetings, 'accessibility'),
        branchs: getTitles(meetings, 'branch'),
        citys: getTitles(meetings, 'city'),
        countrys: getTitles(meetings, 'country'),
        states: getTitles(meetings, 'state'),
        worship_styles: getTitles(meetings, 'worship_style'),
        yearly_meetings: getTitles(meetings, 'yearly_meeting'),
        zips: getTitles(meetings, 'zip'),
    })

    const [selectValues, setSelectValues] = React.useState({
        accessibility: '',
        branch: '',
        city: '',
        country: '',
        state: '',
        worship_style: '',
        yearly_meeting: '',
        zip: '',
    })

    function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
        const newSelectValues = {
            ...selectValues,
            [event.target.name as string]: event.target.value,
        }
        setSelectValues(newSelectValues)
        filterMeetings(newSelectValues)
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
                            input={<OutlinedInput labelWidth={50} name={title} id={`outlined-${title}-simple`} />}
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
    list: {
        height: 50,
        width: 250,
    },
}))
