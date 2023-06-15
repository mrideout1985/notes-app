import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../api/hooks/useAuth'
import useUserStore from '../../stores/authstore'
import styles from './AuthForm.module.scss'

type AuthFormProps = {
	action: 'register' | 'login'
}

const AuthForm: FC<AuthFormProps> = ({ action }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm<{ email: string; password: string }>({ mode: 'onBlur' })
	const user = useUserStore()
	const { execute, loading } = useAuth(action)
	const navigate = useNavigate()

	const onSubmit = (data: Record<'email' | 'password', string>) => {
		execute(data).then((res) => {
			if (res?.status === 409) {
				setError('email', { message: 'Email already exists' })
			}

			if (res?.status === 201 && action === 'register') {
				navigate('/login')
				setError('email', { message: '' })
				setError('password', { message: '' })
			}

			if (res?.status === 201 && action === 'login') {
				user.setCurrentUser({
					email: res.data.user.email,
					token: res.data.Authorization,
					id: res.data.user.id,
				})
				setError('email', { message: '' })
				navigate('/')
				setError('password', { message: '' })
			}
		})
	}

	if (loading) return <p>Loading...</p>

	return (
		<Box className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h4">
					{action === 'register' ? 'Create an account' : 'Sign in'}
				</Typography>
				{action === 'login' ? (
					<Typography>
						<NavLink to={'/register'}>Create an account </NavLink>
						to start taking notes
					</Typography>
				) : (
					<Typography>
						Already have an account?
						<NavLink to={'/login'}> Sign in</NavLink>
					</Typography>
				)}
				<Grid container direction="column" marginBottom={2} spacing={3}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						rules={{ required: 'This field is required' }}
						render={({ field }) => (
							<Grid item xs>
								<TextField
									type={'email'}
									label={'Email'}
									name={field.name}
									onChange={field.onChange}
									fullWidth
									error={errors['email'] ? true : false}
									helperText={errors['email']?.message}
								/>
							</Grid>
						)}
					/>

					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{ required: 'This field is required' }}
						render={({ field }) => (
							<Grid item>
								<TextField
									type={'password'}
									label={'Password'}
									name={field.name}
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={errors['password'] ? true : false}
									helperText={errors['password']?.message}
								/>
							</Grid>
						)}
					/>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							{action === 'register' ? 'Sign up' : 'Sign in'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	)
}

export default AuthForm
