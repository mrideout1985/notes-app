/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"
import styles from "./input.module.scss"

export type FormProps = {
	type: "text" | "number" | "email" | "password"
	label: string
	fieldName: NoteForms
	id?: string
	placeHolder?: string
	defaultValue?: { title: string; description: string }
}

const Input = ({
	type,
	placeHolder,
	fieldName,
	defaultValue,
	label,
	id = "input",
}: FormProps) => {
	const methods = useFormContext()
	const { errors } = methods.formState

	return (
		<>
			<label className={styles["label"]} htmlFor={id}>
				{label}
			</label>
			<input
				type={type}
				defaultValue={defaultValue?.title}
				id={id}
				placeholder={placeHolder}
				className={styles["input"]}
				role='textbox'
				{...methods.register(fieldName, noteformErrors?.[fieldName])}
			/>
			<div className={styles.errors}>
				{errors && errors?.[fieldName] && errors?.[fieldName].message}
			</div>
		</>
	)
}

export { Input }
