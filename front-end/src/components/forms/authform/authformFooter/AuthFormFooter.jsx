import { Box, Button } from '@mui/material';
import styles from './AuthFormFooter.module.scss';
const AuthFormFooter = ({ action }) => (<Box className={styles.footer}>
		<Box className={styles.button_container}>
			<Button variant="contained" color="primary" type="submit">
				{action === 'register' ? 'Sign up' : 'Sign in'}
			</Button>
		</Box>
	</Box>);
export default AuthFormFooter;
