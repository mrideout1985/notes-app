import AuthForm from '@/components/forms/AuthForm'
import styles from '../styles/pagestyles/AuthPage.module.scss'

export interface AuthValues {
	email: string
	password: string
}

const Register = () => {
	return (
		<div className={styles.container}>
			<AuthForm action="register" />
		</div>
	)
}

export default Register
