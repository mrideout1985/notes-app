import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './AuthFormHeader.module.scss';
const AuthFormHeader = ({ action }) => (<Box className={styles.header}>
		<Typography variant="h4" className={`${styles.h4} ${styles.h4_visible}`}>
			{action === 'register' ? 'Sign up' : 'Sign in'}
		</Typography>
		{action === 'login' ? (<Typography>
				<NavLink to={'/register'}>Sign up </NavLink>
				to start taking notes
			</Typography>) : (<Typography>
				Already have an account?
				<NavLink to={'/login'}> Sign in</NavLink>
			</Typography>)}
	</Box>);
export default AuthFormHeader;
