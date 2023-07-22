import { Box, Button } from '@mui/material'
import { FC } from 'react'
import styles from '../AuthForm.module.scss'

type FooterProps = {
	action: 'register' | 'login'
}

const AuthFormFooter: FC<FooterProps> = ({ action }) => (
	<Box className={styles.footer}>
		<Box className={styles.button_container}>
			<Button variant="contained" color="primary" type="submit">
				{action === 'register' ? 'Sign up' : 'Sign in'}
			</Button>
		</Box>
	</Box>
)

export default AuthFormFooter
