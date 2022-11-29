import { useContext } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import SvgAlertCircle from "../components/icons/AlertCircle"
import { AuthContext } from "../stores/AuthProvider"
import styles from "../styles/pagestyles/AuthPage.module.scss"

export type AuthValues = {
	email: string
	password: string
}

const Register = () => {
	const { handleSubmit, setError, control } = useFormContext()
	const navigate = useNavigate()

	const auth = useContext(AuthContext)

	const onRegisterSubmit = handleSubmit(data => {
		auth?.register(data.email, data.password)
			.then(res => {
				if (res.ok) {
					navigate("/login")
				}
				if (!res.ok) {
					return res.json()
				}
			})
			.then(response => {
				setError("email", { message: response.error })
			})
	})

	return (
		<div className={styles.container}>
			<div className={styles.auth}>
				<Form action='POST' onSubmit={onRegisterSubmit}>
					<legend>Register</legend>
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
													{console.log(error.message)}
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

export default Register
