import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useForm, useFormContext } from "react-hook-form"
import { authErrors } from "../../../../utils/formErrors"
import { Form } from "../../../form/form"
import styles from "./authModal.module.scss"
interface AuthModalProps {
	onSubmit: () => void
	open: boolean
}

const AuthModal = ({ onSubmit }: AuthModalProps) => {
	const [errorsStatus, setErrorStatus] = useState<string | undefined>()
	const { register, handleSubmit } = useForm()
	return (
		<Modal
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Modal heading
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.textfields}>
						<div className={styles.input}>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='text'
								{...register("email", authErrors.email)}
							/>
							<div className={styles.errors}>
								{/* {errors?.email && errors.email.message} */}
							</div>
						</div>
						<div className={styles.input}>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								{...register("password", authErrors.password)}
							/>
							<div className={styles.errors}>
								{/* {errors?.password && errors?.password.message} */}
								{errorsStatus && errorsStatus}
							</div>
						</div>
					</div>
					<div className={styles.buttons}>
						<Button type='submit'>Sign in</Button>
						<Button className={styles.closeIcon}>Cancel</Button>
					</div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AuthModal
