import React from "react"
import Modal from "react-bootstrap/Modal"
import { noteformErrors } from "../../../utils/formErrors"
import SvgXCircle from "../../../components/icons/XCircle"
import SvgCheckCircle from "../../../components/icons/CheckCircle"
import styles from "../../../styles/pagestyles/notes.module.scss"
import { useFormContext } from "react-hook-form"
import { notesApi } from "../../../services/noteService"
import { useAuth } from "../../../hooks/useAuth"
import { Form } from "../../form/form"
import { Input } from "../../form/input"

type AddNoteModalProps = {
	show: boolean
	fetchNotes: () => void
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
	setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const AddNoteModal = ({
	fetchNotes,
	setSubmitting,
	show,
	setShow,
}: AddNoteModalProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useFormContext()
	const { user } = useAuth()

	const onSubmit = async (data: any) => {
		setSubmitting(true)

		try {
			await notesApi.addNote({
				...data,
				completed: false,
				email: user.email,
			})
		} finally {
			setShow(false)
		}

		fetchNotes()
		setSubmitting(false)
		resetField("title")
		resetField("description")
	}

	const handleError = (errors: any) => {}

	return (
		<Modal
			show={show}
			backdrop='static'
			keyboard={false}
			className={styles.modal}
			centered
		>
			<Form
				onSubmit={handleSubmit(onSubmit, handleError)}
				handleError={handleError}
			>
				<Input fieldName='title' placeHolder='title' type='text' />

				<div className={styles.inputContainer}>
					<textarea
						placeholder='description'
						{...register("description", noteformErrors.description)}
					/>
					<div className={styles.errors}>
						{errors?.description && errors.description.message}
					</div>
				</div>
				<div className={styles.buttons}>
					<button type='submit'>
						<SvgCheckCircle />
					</button>
					<button onClick={() => setShow(false)}>
						<SvgXCircle />
					</button>
				</div>
			</Form>
		</Modal>
	)
}

export { AddNoteModal }
