import React from "react"
import styles from "../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"

type FormProps = {
	type: "text" | "number" | "email" | "password"
	placeHolder: string
	fieldName: NoteForms
}

const Input = ({ type, placeHolder, fieldName }: FormProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<div className={styles.inputContainer}>
			<input
				type={type}
				placeholder={placeHolder}
				// {...methods.register(fieldName, config)}
				{...methods.register(fieldName, noteformErrors?.[fieldName])}
			/>
			<div className={styles.errors}>
				{errors?.[fieldName] && errors?.[fieldName].message}
			</div>
		</div>
	)
}

export { Input }
