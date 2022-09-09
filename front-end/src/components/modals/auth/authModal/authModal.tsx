import * as Dialog from "@radix-ui/react-dialog"
import { Button } from "@radix-ui/react-toolbar"
import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { authErrors } from "../../../../utils/formErrors"
import { Form } from "../../../form/form"
import styles from "./authModal.module.scss"
interface AuthModalProps {
	onSubmit: () => void
}

const AuthModal = ({ onSubmit }: AuthModalProps) => {
	const [errorStatus, setErrorStatus] = useState<string | undefined>()
	const methods = useFormContext()

	return (
		<Dialog.Root>
			<Dialog.Trigger />
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title />
					<Dialog.Description />
					<Dialog.Close />
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className={styles.textfields}>
							<div className={styles.input}>
								<label htmlFor='email'>Email</label>
								<input
									id='email'
									type='text'
									{...methods.register(
										"email",
										authErrors.email
									)}
								/>
								<div className={styles.errors}>
									{methods.formState.errors?.email &&
										methods.formState.errors.email.message}
								</div>
							</div>
							<div className={styles.input}>
								<label htmlFor='password'>Password</label>
								<input
									id='password'
									type='password'
									{...methods.register(
										"password",
										authErrors.password
									)}
								/>
								<div className={styles.errors}>
									{methods.formState.errors?.password &&
										methods.formState.errors?.password
											.message}
									{errorStatus && errorStatus}
								</div>
							</div>
						</div>
						<div className={styles.buttons}>
							<Button type='submit'>Sign in</Button>
							<Button className={styles.closeIcon}>Cancel</Button>
						</div>
					</Form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default AuthModal
