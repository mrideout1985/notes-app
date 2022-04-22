/* eslint-disable jsx-a11y/no-redundant-roles */
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"
import styles from "./textarea.module.scss"

type TextAreaProps = {
	fieldName: NoteForms
	defaultValue?: { title: string; description: string }
	placeholder?: string
	label: string
}

const TextArea = ({
	fieldName,
	defaultValue,
	placeholder,
	label,
}: TextAreaProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<>
			<label className={styles["label"]} htmlFor='textarea'>
				{label}
			</label>
			<textarea
				className={styles["textarea"]}
				id='textarea'
				role='textbox'
				defaultValue={defaultValue?.description}
				placeholder={placeholder}
				{...methods.register(
					"description",
					noteformErrors?.[fieldName]
				)}
			/>
			<div
				className={styles.errors}
				data-testid='errors-container-element'
			>
				{errors?.description && errors.description.message}
			</div>
		</>
	)
}

export { TextArea }
