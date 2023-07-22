import AuthForm from '../../components/forms/authform/AuthForm'
import styles from './Register.module.scss'

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
