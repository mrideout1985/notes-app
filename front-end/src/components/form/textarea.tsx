import styles from "../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"

type TextAreaProps = {
	fieldName: NoteForms
	defaultValue?: { title: string; description: string }
}

const TextArea = ({ fieldName, defaultValue }: TextAreaProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<div className={styles.inputContainer}>
			<textarea
				defaultValue={defaultValue?.description}
				placeholder='description'
				{...methods.register(
					"description",
					noteformErrors?.[fieldName]
				)}
			/>
			<div className={styles.errors}>
				{errors?.description && errors.description.message}
			</div>
		</div>
	)
}

export { TextArea }
