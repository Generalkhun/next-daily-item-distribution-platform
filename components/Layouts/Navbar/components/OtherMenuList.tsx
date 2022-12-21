import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button'
import { makeStyles } from '@material-ui/core';
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
    menuItemInsideMenuList: {
        marginLeft: 100,
        paddingRight: 35,

    }
})
export default function OtherMenuList() {
    const router = useRouter()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Menu">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <MenuIcon style={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Button onClick={e => {
                    e.preventDefault()
                    typeof window !== 'undefined' && router.push('/datamanagement')
                }} style={{ color: 'Black' }} fullWidth startIcon={<AddCircleOutlineIcon />}>เพิ่ม/แก้ไขข้อมูล</Button>
                <Divider />
                <Button onClick={e => {
                    e.preventDefault()
                    typeof window !== 'undefined' && router.push('/login')
                }} style={{ color: 'Black' }} fullWidth startIcon={<Logout />}>ออกจากระบบ</Button>

            </Menu>
        </React.Fragment>
    );
}
