import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { userService } from "../../../services/userService"
import { useForm } from "react-hook-form"
import styles from "./authModals.module.scss"
import { authErrors } from "../../../utils/formErrors"
import * as Dialog from "@radix-ui/react-dialog"

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
			<Dialog.Root open={toggleSignUp}>
				<Dialog.Trigger />
				<Dialog.Portal className={styles.modal}>
					<Dialog.Overlay className={styles.overlay}>
						<Dialog.Content className={styles.content}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={styles.textfields}>
									<div className={styles.input}>
										<label htmlFor='email'>Email</label>
										<input
											id='email'
											type='text'
											{...register(
												"email",
												authErrors.email
											)}
										/>
										<div className={styles.errors}>
											{errors?.email &&
												errors.email.message}
										</div>
									</div>
									<div className={styles.input}>
										<label htmlFor='password'>
											Password
										</label>
										<input
											id='password'
											type='password'
											{...register(
												"password",
												authErrors.password
											)}
										/>
										<div className={styles.errors}>
											{errors?.password &&
												errors?.password.message}
											{errorStatus && errorStatus}
										</div>
									</div>
								</div>
								<div className={styles.buttons}>
									<Button type='submit'>Sign in</Button>
									<Button
										onClick={() => setToggleLogin(false)}
										className={styles.closeIcon}
									>
										Cancel
									</Button>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Overlay>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	)
}

export { SignUpModal }
