import { Alert, Box, Card, CardContent, Dialog, Divider, Grid, InputLabel, TextField, } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../api/hooks/useAuth';
import useUserStore from '../../../stores/authstore';
import styles from './AuthForm.module.scss';
import AuthFormHeader from './authformHeader/AuthFormHeader';
import AuthFormFooter from './authformFooter/AuthFormFooter';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().max(32).required().min(8),
});
const AuthForm = ({ action }) => {
    const { handleSubmit, control, watch, formState: { errors }, setError, } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const user = useUserStore();
    const navigate = useNavigate();
    const { execute } = useAuth(action);
    const [responseError, setResponseError] = useState('');
    const handleCloseAlert = () => {
        setResponseError('');
    };
    const onSubmit = (data) => {
        setResponseError('');
        execute(data).then((res) => {
            if (res?.status === 409) {
                setError('email', { message: 'Email already exists' });
            }
            if (res?.status === 201 && action === 'register') {
                navigate('/login');
                setError('email', { message: '' });
                setError('password', { message: '' });
            }
            if (res?.status === 201 && action === 'login') {
                user.setCurrentUser({
                    email: res.data.user.email,
                    token: res.data.Authorization,
                    id: res.data.user.id,
                });
                setError('email', { message: res.data.message });
                navigate('/');
                setError('password', { message: '' });
            }
            if (res?.status === 401) {
                setResponseError('Invalid credentials, please check your email and password and try again');
            }
        });
    };
    return (<>
			<Card className={styles.card} elevation={5} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
				<CardContent className={styles.content}>
					<AuthFormHeader action={action}/>
					<Divider sx={{ margin: 0 }}/>
					<Box className={styles.form_container}>
						<Grid container direction="column" marginBottom={2} spacing={3}>
							<Controller name="email" control={control} defaultValue="" render={({ field }) => (<Grid item xs>
										<InputLabel htmlFor="email">
											Email
										</InputLabel>
										<TextField id="email" type={'email'} InputLabelProps={{
                shrink: true,
            }} name={field.name} onChange={field.onChange} fullWidth error={errors['email'] ? true : false} helperText={errors['email']?.message}/>
									</Grid>)}/>
							<Controller name="password" control={control} defaultValue="" render={({ field }) => (<Grid item>
										<InputLabel htmlFor="password">
											Password
										</InputLabel>
										<TextField id="password" type={'password'} InputLabelProps={{
                shrink: true,
            }} name={field.name} value={field.value} onChange={field.onChange} fullWidth error={errors['password']
                ? true
                : false} helperText={errors['password']?.message}/>
									</Grid>)}/>
						</Grid>
					</Box>
				</CardContent>
				<AuthFormFooter action={action}/>
			</Card>
			<Dialog open={responseError ? true : false}>
				<Alert onClose={handleCloseAlert} severity="error">
					{responseError}
				</Alert>
			</Dialog>
		</>);
};
export default AuthForm;
