import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AuthFormFields from '../../components/forms/authform/AuthFormFields'
import styles from './Login.module.scss'
import useLogin from '../../api/hooks/useLogin'

export interface AuthValues {
	email: string
	password: string
}

const Login = () => {
	const login = useLogin()
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().max(32).required().min(8),
	})

	const form = useForm<{ email: string; password: string }>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: { email: string; password: string }) => {
		login.execute(data)
	}

	const responseError = new Map([
		['invalid_credentials', 'Please check credentials and try again'],
	])

	return (
		<div className={styles.container}>
			<Paper
				component="form"
				onSubmit={form.handleSubmit(onSubmit)}
				elevation={8}
				className={styles.paper}
			>
				<Box className={styles.formfields}>
					<AuthFormFields
						control={form.control}
						formState={form.formState}
					/>
				</Box>
				<Box className={styles.actions}>
					<Button variant="contained" type="submit">
						Login
					</Button>
				</Box>
				{login.responseError && (
					<Typography color="red">
						{responseError.get(login.responseError) ??
							'Network Error'}
					</Typography>
				)}
			</Paper>
		</div>
	)
}

export default Login
