import { AxiosError } from 'axios'

import { Controller, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import useUserStore from '@/stores/authstore'

import { Button, FormGroup, Input } from '@mui/material'
import { login } from '../api/services/services'
import SvgAlertCircle from '../components/icons/AlertCircle'
import styles from '../styles/pagestyles/AuthPage.module.scss'

export interface AuthValues {
	email: string
	password: string
}

const Login = () => {
	const { handleSubmit, setError, control, clearErrors } = useForm()
	const navigate = useNavigate()
	const user = useUserStore()

	const onLoginSubmit = handleSubmit((data) => {
		login(data.email, data.password).then((res) => {
			if (res instanceof AxiosError) {
				return setError('email', {
					type: 'manual',
					message: res.response?.data.message,
				})
			}
			localStorage.setItem('token', res.data.Authorization)
			user.setCurrentUser({
				email: res.data.user.email,
				token: res.data.Authorization,
				id: res.data.user.id,
			})
			navigate('/')
		})
	})

	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<form action="POST" onSubmit={onLoginSubmit}>
					<div className={styles.controls_container}>
						<legend>Login</legend>
						<FormGroup className={styles.controls}>
							<Controller
								name="email"
								control={control}
								rules={{ required: true }}
								render={({ fieldState: { error }, field }) => (
									<>
										<Input
											id="email"
											type="text"
											aria-label="email"
											{...field}
										/>
										<div className={styles.error}>
											{error?.message && (
												<>
													<SvgAlertCircle />
													<p>{error.message}</p>
												</>
											)}
										</div>
									</>
								)}
								defaultValue=""
							/>
						</FormGroup>
						<FormGroup className={styles.controls}>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<>
										<Input
											id="password"
											type="password"
											aria-label="password"
											{...field}
										/>
									</>
								)}
								defaultValue=""
							/>
						</FormGroup>
					</div>
					<div className={styles.buttons}>
						<NavLink to="/register">Register</NavLink>
						<Button size="small" color="primary" type="submit">
							Login
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
