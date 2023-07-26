import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { User } from '../../stores/authstore'
import styles from './UserNavDropdown.module.scss'

interface UserNavDropdownInteface {
	handleLogout: () => void
	currentUser: User | null
}

const UserNavDropdown = ({
	handleLogout,
	currentUser,
}: UserNavDropdownInteface) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	useEffect(() => {
		if (currentUser?.token === undefined) {
			setAnchorElUser(null)
		}
	}, [currentUser])

	return (
		<Box className={styles.dropdown}>
			<Tooltip className={styles.button_container} title="Open settings">
				<IconButton
					className={styles.icon_button}
					onClick={handleOpenUserMenu}
					sx={{ p: 0, m: 0 }}
				>
					{currentUser?.email ? (
						<Avatar variant="rounded" />
					) : (
						<Avatar variant="rounded" />
					)}
				</IconButton>
			</Tooltip>
			{currentUser && (
				<Menu
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
					className={styles.menu}
					marginThreshold={30}
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					sx={{ p: 0, m: 1 }}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<MenuItem className={styles.menu_item}>
						<Typography onClick={handleLogout}>Logout</Typography>
					</MenuItem>
				</Menu>
			)}
		</Box>
	)
}

export default UserNavDropdown
