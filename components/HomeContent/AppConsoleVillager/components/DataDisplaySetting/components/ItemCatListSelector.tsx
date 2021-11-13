import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useEffect } from 'react';
import Button from '@mui/material/Button'

// const options = [
//   'Show some love to MUI',
//   'Show all notification content',
//   'Hide sensitive notification content',
//   'Hide all notification content',
// ];

interface Props {
    options: string[]
    displayVillagerDispatch: any
}

export const ItemCatListSelector = (props: Props) => {
    const { options, displayVillagerDispatch } = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // update selected item inside context on the side effect of updating selectedIndex state
    useEffect(() => {
        displayVillagerDispatch({ type: 'itemCatSelect', payload: selectedIndex })
    }, [selectedIndex])

    return (
        <div>
            <List
                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="ประเภทสิ่งของ"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={<Typography style={{ fontFamily: 'Kanit' }}>เลือกประเภทของ</Typography>}
                        secondary={<Typography style={{ fontFamily: 'Kanit', fontStyle: 'italic', color: 'gray' }}>{options[selectedIndex]}</Typography>}
                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event: any) => handleMenuItemClick(event, index)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
