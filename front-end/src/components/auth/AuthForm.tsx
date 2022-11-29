import { useContext } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { AuthContext } from "../../stores/AuthProvider"
import SvgAlertCircle from "../icons/AlertCircle"
import styles from "./AuthForm.module.scss"

const AuthForm = () => {
	const { handleSubmit, setError, control, clearErrors } = useFormContext()
	const navigate = useNavigate()

	const auth = useContext(AuthContext)

	const onRegisterSubmit = handleSubmit(async data => {
		await auth?.register(data.email, data.password).then(res => {
			if (!res.ok) {
				setError(res.message, { message: res.error })
			}
		})
	})

	return (
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
								<Label className={styles.label} htmlFor='email'>
									Email
								</Label>
								<Input id='email' type='text' {...field} />
								<div className={styles.error}>
									{error?.message && (
										<>
											<SvgAlertCircle size={24} />
											<p>{error.message}</p>
											{console.log(error.message)}
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
	)
}

export default AuthForm
