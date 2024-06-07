import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import AuthFormFields from '../../components/Forms/AuthForm/AuthFormFields'
import styles from './Login.module.scss'
import useLogin from '../../api/hooks/auth/useLogin'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/authstore'

export interface AuthValues {
	email: string
	password: string
}

const Login = () => {
	const navigate = useNavigate()
	const login = useLogin({
		onSuccess: () => {
			navigate('/')
		},
	})
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
				<Box className={styles.footer}>
					<Box className={styles.responseError}>
						{login.responseError && (
							<Typography mt={1} color="red">
								{login.responseError}
							</Typography>
						)}
					</Box>
					<Box className={styles.actions}>
						<Link color="black" to="/register">
							Register
						</Link>
						<Button
							disabled={login.loading}
							size="small"
							variant="contained"
							type="submit"
						>
							Login
						</Button>
					</Box>
				</Box>
			</Paper>
		</div>
	)
}

export default Login
