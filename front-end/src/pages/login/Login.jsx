import AuthForm from '../../components/forms/authform/AuthForm';
import styles from './Login.module.scss';
const Login = () => {
    return (<div className={styles.container}>
			<AuthForm action="login"/>
		</div>);
};
export default Login;
