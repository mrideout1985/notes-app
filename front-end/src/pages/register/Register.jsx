import AuthForm from '../../components/forms/authform/AuthForm';
import styles from './Register.module.scss';
const Register = () => {
    return (<div className={styles.container}>
			<AuthForm action="register"/>
		</div>);
};
export default Register;
