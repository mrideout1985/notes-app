import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { userService } from "../../../../services/userService"
import useUserStore from "../../../../stores/store"
import { authErrors } from "../../../../utils/formErrors"
import styles from "./authModal.module.scss"

interface LoginProps {
	setAuthOpen: Dispatch<SetStateAction<{ login: boolean; signIn: boolean }>>
	open: boolean
}

const Login = ({ open, setAuthOpen }: LoginProps) => {
	const [errorsStatus, setErrorStatus] = useState<string | undefined>()
	const loginAuth = userService
	const { setUser } = useUserStore()
	const { register, handleSubmit, formState, reset, clearErrors, watch } =
		useForm()

	const handleLogin = (data: any) => {
		loginAuth.login(data.email, data.password).then(res => {
			if (res.status === 201) {
				setUser(res.data.user.email)
				setAuthOpen({ login: false, signIn: false })
			}
			setErrorStatus("Invalid Credentials - Please try again")
		})
	}

	const watchAllFields: [string | undefined, string | undefined] = watch([
		"email",
		"password",
	])

	const handleReset = () => {
		clearErrors(["email", "password"])
		reset()
		setAuthOpen({ login: false, signIn: false })
		setErrorStatus(undefined)
	}

	const handleError = () => {
		return watchAllFields.map(field => field?.length) !== undefined
			? errorsStatus
			: setErrorStatus(undefined)
	}

	return (
		<Modal
			size='sm'
			aria-labelledby='contained-modal-title-vcenter'
			enforceFocus={true}
			centered
			show={open}
			onHide={handleReset}
			animation={true}
			className={styles.modal}
		>
			<Modal.Body className={styles.body}>
				<Form
					className={styles.form}
					onSubmit={handleSubmit(handleLogin)}
				>
					<Form.Group className={styles.formgroup}>
						<Form.Label htmlFor='email'>Email</Form.Label>
						<Form.Control
							id='email'
							type='text'
							className={styles.control}
							{...register("email", authErrors.email)}
						/>
					</Form.Group>
					<Form.Group className={styles.formgroup}>
						<Form.Label htmlFor='password'>Password</Form.Label>
						<Form.Control
							id='password'
							type='password'
							className={styles.control}
							{...register("password", authErrors.password)}
						/>
					</Form.Group>
					<Form.Group className={styles.errorsGroup}>
						<Form.Text as={"div"} className={styles.errors}>
							<ul>
								<li>
									{formState.errors?.email &&
										formState.errors.email.message}
								</li>
								<li>
									{formState.errors?.password &&
										formState.errors.password.message}
								</li>
								<li>{handleError}</li>
							</ul>
						</Form.Text>
					</Form.Group>
					<Form.Group className={styles.buttons}>
						<Button type='submit'>Login</Button>
						<Button type='reset' onClick={handleReset}>
							Cancel
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default Login
