import React from "react"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"
import styles from "./input.module.scss"

type FormProps = {
	type: "text" | "number" | "email" | "password"
	label: string
	placeHolder?: string
	fieldName: NoteForms
	defaultValue?: { title: string; description: string }
}

const Input = ({
	type,
	placeHolder,
	fieldName,
	defaultValue,
	label,
}: FormProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<>
			<label className={styles["label"]} htmlFor='input'>
				{label}
			</label>
			<input
				type={type}
				defaultValue={defaultValue?.title}
				id='input'
				placeholder={placeHolder}
				className={styles["input"]}
				{...methods.register(fieldName, noteformErrors?.[fieldName])}
			/>
			<div className={styles.errors}>
				{errors?.[fieldName] && errors?.[fieldName].message}
			</div>
		</>
	)
}

export { Input }
