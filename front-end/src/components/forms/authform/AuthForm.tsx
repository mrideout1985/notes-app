import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../api/hooks/useAuth'
import useUserStore from '../../../stores/authstore'
import styles from './AuthForm.module.scss'
import AuthFormHeader from './authformHeader/AuthFormHeader'
import AuthFormFooter from './authformFooter/AuthFormFooter'

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
	const navigate = useNavigate()
	const { execute } = useAuth(action)

	const [responseError, setResponseError] = useState<string | undefined>('')

	const onSubmit = (data: Record<'email' | 'password', string>) => {
		setResponseError('')
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
				setError('email', { message: res.data.message })
				navigate('/')
				setError('password', { message: '' })
			}

			if (res?.status === 401) {
				setResponseError(
					'Invalid credentials, please check your email and password and try again',
				)
			}
		})
	}

	return (
		<Card
			className={styles.card}
			elevation={5}
			component="form"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<CardContent className={styles.content}>
				<AuthFormHeader action={action} />
				<Divider className={styles.divider} />
				<Box className={styles.form_container}>
					<Grid
						container
						direction="column"
						marginBottom={2}
						spacing={3}
					>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							rules={{
								required: 'Email is required',

								validate: (value) => {
									if (value.length > 100) {
										return 'Email cannot be more than 100 characters'
									}

									if (!value.includes('@')) {
										return 'Invalid email address'
									}

									return true
								},
							}}
							render={({ field }) => (
								<Grid item xs>
									<InputLabel htmlFor="email">
										Email
									</InputLabel>
									<TextField
										id="email"
										type={'email'}
										InputLabelProps={{
											shrink: true,
										}}
										name={field.name}
										onChange={field.onChange}
										fullWidth
										error={errors['email'] ? true : false}
										helperText={
											errors['email']?.message ||
											responseError
										}
									/>
								</Grid>
							)}
						/>
						<Controller
							name="password"
							control={control}
							defaultValue=""
							rules={{
								required: 'Password is required',
								validate: (value) => {
									if (value.length < 8) {
										return 'Password must be at least 8 characters long'
									}

									if (value.length > 100) {
										return 'Password is too long'
									}

									if (value === 'password') {
										return 'Password cannot be "password"'
									}

									return true
								},
							}}
							render={({ field }) => (
								<Grid item>
									<InputLabel htmlFor="password">
										Password
									</InputLabel>
									<TextField
										id="password"
										type={'password'}
										InputLabelProps={{
											shrink: true,
										}}
										name={field.name}
										value={field.value}
										onChange={field.onChange}
										fullWidth
										error={
											errors['password'] ? true : false
										}
										helperText={errors['password']?.message}
									/>
								</Grid>
							)}
						/>
					</Grid>
				</Box>
				<AuthFormFooter action={action} />
			</CardContent>
		</Card>
	)
}

export default AuthForm
