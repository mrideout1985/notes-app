import React from "react"

type TextAreaProps = {
    text: string;
    type: "textarea";
    fieldName: 

}

const TextArea = ({}: TextAreaProps) => {
	return (
        <div className={styles.inputContainer}>
					<textarea
						placeholder='description'
						{...register("description", noteformErrors.description)}
					/>
					<div className={styles.errors}>
						{errors?.description && errors.description.message}
					</div>
				</div>
    )
}

export { TextArea }
