import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { userService } from "../../../../services/userService"
import useUserStore from "../../../../stores/store"
import { authErrors } from "../../../../utils/formErrors"
import styles from "./authModal.module.scss"

interface SignUpProps {
	setAuthOpen: Dispatch<SetStateAction<{ login: boolean; signIn: boolean }>>
	open: boolean
}

const SignUp = ({ open, setAuthOpen }: SignUpProps) => {
	const [errorsStatus, setErrorStatus] = useState<string | undefined>()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		clearErrors,
	} = useForm()

	const handleSignUp = (data: any) => {
		userService.signUp(data.email, data.password).then(res => {
			if (res.status === 201) {
				setErrorStatus(undefined)
				setAuthOpen({ login: true, signIn: false })
			}

			setErrorStatus(
				"User already exists in database. Try a different email"
			)
		})
	}

	const watchAllFields: [string, string] = watch(["email", "password"])

	const handleReset = () => {
		clearErrors(["email", "password"])
		reset()
		setAuthOpen({ login: false, signIn: false })
		setErrorStatus(undefined)
	}

	const handleError = () => {
		if (watchAllFields.map(field => field?.length) !== undefined) {
			return errorsStatus
		}
		setErrorStatus(undefined)
		return errorsStatus
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
					onSubmit={handleSubmit(handleSignUp)}
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
								<li>{errors?.email && errors.email.message}</li>
								<li>
									{errors?.password &&
										errors.password.message}
								</li>
								<li>{handleError()}</li>
							</ul>
						</Form.Text>
					</Form.Group>
					<Form.Group className={styles.buttons}>
						<Button type='submit'>Register</Button>
						<Button type='reset' onClick={handleReset}>
							Cancel
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default SignUp
