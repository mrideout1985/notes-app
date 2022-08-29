/* eslint-disable jsx-a11y/no-redundant-roles */
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import styles from "./form.module.scss"

type FormProps = {
	children: ReactNode
	onSubmit: any
	handleError: (errors: any) => void
}

const Form = ({ children, onSubmit, handleError }: FormProps) => {
	const { handleSubmit } = useForm()

	return (
		<form
			role={`form`}
			className={styles.form}
			onSubmit={handleSubmit(onSubmit, handleError)}
		>
			{children}
		</form>
	)
}

export { Form }
