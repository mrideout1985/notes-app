import AuthForm from '@/components/forms/AuthForm'
import styles from '../styles/pagestyles/AuthPage.module.scss'
export interface AuthValues {
	email: string
	password: string
}

const Login = () => {
	return (
		<div className={styles.container}>
			<AuthForm action="login" />
		</div>
	)
}

export default Login
