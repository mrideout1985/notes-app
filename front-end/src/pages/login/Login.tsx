import AuthForm from '../../components/forms/authform/AuthForm'
import styles from './Login.module.scss'
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
