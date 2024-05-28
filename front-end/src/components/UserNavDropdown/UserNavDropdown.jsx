import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography, } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './UserNavDropdown.module.scss';
const UserNavDropdown = ({ handleLogout, currentUser, }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        if (currentUser?.token === undefined) {
            setAnchorElUser(null);
        }
    }, [currentUser]);
    return (<Box className={styles.dropdown}>
			<Tooltip className={styles.button_container} title="Open settings">
				<IconButton className={styles.icon_button} onClick={handleOpenUserMenu} sx={{ p: 0, m: 0 }}>
					{currentUser?.email ? (<Avatar variant="rounded"/>) : (<Avatar variant="rounded"/>)}
				</IconButton>
			</Tooltip>
			{currentUser && (<Menu open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} className={styles.menu} marginThreshold={30} anchorEl={anchorElUser} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }} sx={{ p: 0, m: 1 }} transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
					<MenuItem className={styles.menu_item}>
						<Typography onClick={handleLogout}>Logout</Typography>
					</MenuItem>
				</Menu>)}
		</Box>);
};
export default UserNavDropdown;
