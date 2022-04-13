import styles from "../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"

type TextAreaProps = {
	fieldName: NoteForms
	defaultValue?: { title: string; description: string }
	placeholder?: string
}

const TextArea = ({ fieldName, defaultValue, placeholder }: TextAreaProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<>
			<textarea
				defaultValue={defaultValue?.description}
				placeholder={placeholder}
				{...methods.register(
					"description",
					noteformErrors?.[fieldName]
				)}
			/>
			<div className={styles.errors}>
				{errors?.description && errors.description.message}
			</div>
		</>
	
	)
}

export { TextArea }
