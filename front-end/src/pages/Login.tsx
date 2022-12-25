import { AxiosError } from "axios"
import { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

import { login } from "../api/services/services"
import SvgAlertCircle from "../components/icons/AlertCircle"
import styles from "../styles/pagestyles/AuthPage.module.scss"

export interface AuthValues {
	email: string
	password: string
}

const Login = () => {
	const { handleSubmit, setError, control, clearErrors } = useFormContext()
	const navigate = useNavigate()

	const onLoginSubmit = handleSubmit(data => {
		login(data.email, data.password).then(res => {
			if (res instanceof AxiosError) {
				return setError("email", {
					type: "manual",
					message: res.response?.data.message,
				})
			}
			localStorage.setItem("token", res.data.Authorization)
			navigate("/")
		})
	})

	useEffect(() => {
		clearErrors()
	}, [clearErrors])

	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<Form action='POST' onSubmit={onLoginSubmit}>
					<legend>Login</legend>
					<div className={styles.controls_container}>
						<FormGroup className={styles.controls}>
							<Controller
								name='email'
								control={control}
								rules={{ required: true }}
								render={({ fieldState: { error }, field }) => (
									<>
										<Label
											className={styles.label}
											htmlFor='email'
										>
											Email
										</Label>
										<Input
											id='email'
											type='text'
											{...field}
										/>
										<div className={styles.error}>
											{error?.message && (
												<>
													<SvgAlertCircle size={24} />
													<p>{error.message}</p>
												</>
											)}
										</div>
									</>
								)}
								defaultValue=''
							/>
						</FormGroup>

						<FormGroup className={styles.controls}>
							<Controller
								name='password'
								control={control}
								render={({ field }) => (
									<>
										<Label
											className={styles.label}
											htmlFor='password'
										>
											Password
										</Label>
										<Input
											id='password'
											type='password'
											{...field}
										/>
									</>
								)}
								defaultValue=''
							/>
						</FormGroup>
					</div>

					<div className={styles.buttons}>
						<Button size='small' color='primary' type='submit'>
							Submit
						</Button>
					</div>
				</Form>
			</div>
			<div className={styles.splash} />
		</div>
	)
}

export default Login
