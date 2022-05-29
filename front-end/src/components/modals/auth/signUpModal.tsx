import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { userService } from "../../../services/userService"
import { useForm } from "react-hook-form"
import styles from "./authModals.module.scss"
import { authErrors } from "../../../utils/formErrors"
import { XCircle } from "../../icons"

interface SignUpModalInterface {
	toggleLogin: boolean
	setToggleLogin: React.Dispatch<React.SetStateAction<boolean>>
	toggleSignUp: boolean
	setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUpModal = ({
	setToggleLogin,
	toggleSignUp,
	setToggleSignUp,
}: SignUpModalInterface) => {
	const [errorStatus, setErrorStatus] = useState<string | undefined>()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const onSubmit = async (data: any) => {
		await userService
			.signUp(data.email, data.password)
			.then(res => {
				if (res.status === 201) {
					setToggleSignUp(false)
					setToggleLogin(true)
				}
			})
			.catch(error => {
				if (error.response.status === 500) {
					return setErrorStatus("The user already exists")
				}
			})
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
					onClick={(e: React.SyntheticEvent) =>
						setToggleSignUp(false)
					}
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
							{errorStatus && errorStatus}
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
