import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { userService } from "../../../services/userService"
import { useForm } from "react-hook-form"
import styles from "./loginModal.module.scss"
import { authErrors } from "../../../utils/formErrors"
import { XCircle } from "../../icons"
import Alert from "react-bootstrap/Alert"

interface SignUpModalInterface {
	toggleLogin: boolean
	setToggleLogin: React.Dispatch<React.SetStateAction<boolean>>
	toggleSignUp: boolean
	setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>
	setShowError: React.Dispatch<React.SetStateAction<boolean>>
	showError: boolean
}

const SignUpModal = ({
	setToggleLogin,
	toggleSignUp,
	setToggleSignUp,
	setShowError,
	showError,
}: SignUpModalInterface) => {
	const [displayError, setDisplayError] = useState<string>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data: any) => {
		try {
			await userService.signUp(data.email, data.password).then(res => {
				if (res.status === 201) {
					setToggleSignUp(false)
					setToggleLogin(true)
				}
			})
		} catch (error: any) {
			setShowError(true)
			setDisplayError("User Already Exists")
		}
	}

	return (
		<>
			<Modal
				show={toggleSignUp}
				backdrop='static'
				centered={true}
				keyboard={false}
				size='sm'
				className={styles.modal}
			>
				<button
					onClick={() => setToggleSignUp(false)}
					className={styles.closeIcon}
				>
					<XCircle color={"lightblack"} />
				</button>
				<h4>Create an account</h4>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.input}>
						<input
							type='text'
							placeholder='Email'
							{...register("email", authErrors.email)}
						/>
						<div className={styles.errors}>
							{errors?.email && errors.email.message}
						</div>
					</div>
					<div className={styles.input}>
						<input
							type='password'
							placeholder='Password'
							{...register("password", authErrors.password)}
						/>
						<div className={styles.errors}>
							{errors?.password && errors?.password.message}
							{showError ? (
								<Alert
									className={styles.alert}
									show={showError}
								>
									{displayError}
								</Alert>
							) : null}
						</div>
					</div>
					<div className={styles.buttons}>
						<Button type='submit'>Create an account</Button>
					</div>
				</form>
			</Modal>
		</>
	)
}

export { SignUpModal }
