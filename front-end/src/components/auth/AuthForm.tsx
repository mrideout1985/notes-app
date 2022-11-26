import React from "react"
import { FieldErrorsImpl, UseFormRegister, UseFormReset } from "react-hook-form"
import { Button } from "reactstrap"
import { AuthValues } from "../../pages/Register"
import styles from "./AuthForm.module.scss"

type AuthFormProps = {
	onSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined
	) => Promise<void>
	register: UseFormRegister<AuthValues>
	errors: Partial<
		FieldErrorsImpl<{
			email: string
			password: string
		}>
	>
	legend: string
	reset: UseFormReset<AuthValues>
}

const AuthForm = ({
	onSubmit,
	register,
	errors,
	legend,
	reset,
}: AuthFormProps) => {
	return (
		<form onSubmit={onSubmit}>
			<fieldset>
				<legend>{legend}</legend>
				<div className={styles.controls_container}>
					<div className={styles.controls}>
						<label aria-label={"required"} htmlFor='email'>
							Email
						</label>
						<input
							type='text'
							id='email'
							{...(register("email"), { required: true })}
						/>
					</div>
					<div className={styles.controls}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							{...register("password")}
						/>
					</div>
				</div>
			</fieldset>
			<div className={styles.footer}>
				<Button type='submit'>Submit</Button>
				<Button type='button'>Clear</Button>
			</div>
		</form>
	)
}

export default AuthForm
