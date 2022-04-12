import styles from "../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { noteformErrors, NoteForms } from "../../utils/formErrors"

type TextAreaProps = {
	fieldName: NoteForms
}

const TextArea = ({ fieldName }: TextAreaProps) => {
	const methods = useFormContext()

	const { errors } = methods.formState

	return (
		<div className={styles.inputContainer}>
			<textarea
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
