import React, { ReactNode } from "react"
import { useForm } from "react-hook-form"
import styles from "./form.module.scss"

type Props = {
	children: ReactNode
	onSubmit: any
	handleError: (errors: any) => void
}

const Form = ({ children, onSubmit, handleError }: Props) => {
	const { handleSubmit } = useForm()

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit, handleError)}
		>
			{children}
		</form>
	)
}

export { Form }
