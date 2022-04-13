import React from "react"
import styles from "../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"

type FormProps = {
	type: "text" | "number" | "email" | "password"
	placeHolder?: string
	fieldName: NoteForms
	defaultValue?: { title: string; description: string }
}

const Input = ({ type, placeHolder, fieldName, defaultValue}: FormProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (

		<>
		<input
				type={type}
				defaultValue={defaultValue?.title}
				placeholder={placeHolder}
				{...methods.register(fieldName, noteformErrors?.[fieldName])}
			/>
			<div className={styles.errors}>
				{errors?.[fieldName] && errors?.[fieldName].message}
			</div>
		</>
	)
}

export { Input }
