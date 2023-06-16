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
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0, m: 0 }}>
					{currentUser?.email ? <Avatar /> : <Avatar />}
				</IconButton>
			</Tooltip>
			{currentUser && (
				<Menu
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<MenuItem>
						<Typography onClick={handleLogout}>Logout</Typography>
					</MenuItem>
				</Menu>
			)}
		</Box>
	)
}

export default UserNavDropdown
