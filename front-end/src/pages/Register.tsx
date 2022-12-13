import { AxiosError } from "axios"
import { Controller, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { register } from "../api/services/services"
import SvgAlertCircle from "../components/icons/AlertCircle"
import { useUserStore } from "../stores/authstore"
import styles from "../styles/pagestyles/AuthPage.module.scss"

export type AuthValues = {
	email: string
	password: string
}

const Register = () => {
	const auth = useUserStore()
	const navigate = useNavigate()

	const { handleSubmit, setError, control } = useFormContext()

	const onRegisterSubmit = handleSubmit(data => {
		register(data.email, data.password).then(res => {
			if (res instanceof AxiosError) {
				return setError("email", {
					type: "manual",
					message: res.response?.data.message,
				})
			}
			navigate("/login")
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
