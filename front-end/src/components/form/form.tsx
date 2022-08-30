/* eslint-disable jsx-a11y/no-redundant-roles */
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import styles from "./form.module.scss"

type FormProps = {
	children: ReactNode
	onSubmit: any
	handleError?: (errors: any) => void
}

const Form = ({ children, onSubmit, handleError }: FormProps) => {
	const methods = useFormContext()

	return (
		<form
			role={`form`}
			className={styles.form}
			onSubmit={methods.handleSubmit(onSubmit, handleError)}
		>
			{children}
		</form>
	)
}

export { Form }
