import { User } from '@/stores/authstore'
import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface UserNavDropdownInteface {
	handleLogout: () => void
	currentUser: User | null
}

const UserNavDropdown = ({
	handleLogout,
	currentUser,
}: UserNavDropdownInteface) => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	return (
		currentUser && (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt="Remy Sharp"
							src="src/assets/images/rideout.png"
						/>
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem onClick={handleCloseUserMenu}>
						<NavLink to="/profile">Profile</NavLink>
					</MenuItem>

					<MenuItem>
						<Typography onClick={handleLogout}>Logout</Typography>
					</MenuItem>
				</Menu>
			</Box>
		)
	)
}

export default UserNavDropdown
