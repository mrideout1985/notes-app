import { AxiosError } from 'axios'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

import { register } from '../api/services/services'
import SvgAlertCircle from '../components/icons/AlertCircle'
import styles from '../styles/pagestyles/AuthPage.module.scss'

export interface AuthValues {
	email: string
	password: string
}

const Register = () => {
	const navigate = useNavigate()

	const { handleSubmit, setError, control } = useForm()

	const onRegisterSubmit = handleSubmit((data) => {
		register(data.email, data.password).then((res) => {
			if (res instanceof AxiosError) {
				return setError('email', {
					type: 'manual',
					message: res.response?.data.message,
				})
			}
			navigate('/login')
		})
	})

	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<Form action="POST" onSubmit={onRegisterSubmit}>
					<div className={styles.controls_container}>
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
											{...field}
										/>
									</>
								)}
								defaultValue=""
							/>
						</FormGroup>
					</div>

					<div className={styles.buttons}>
						<NavLink to="/login">Login</NavLink>
						<Button size="small" color="primary" type="submit">
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default Register
