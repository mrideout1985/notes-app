import React from "react"
import Modal from "react-bootstrap/Modal"
import SvgXCircle from "../../../icons/XCircle"
import SvgCheckCircle from "../../../icons/CheckCircle"
import { useFormContext } from "react-hook-form"
import { notesApi } from "../../../../services/noteService"
import { useAuth } from "../../../../hooks/useAuth"
import { Form } from "../../../form/form"
import { Input } from "../../../form/input"
import { TextArea } from "../../../form/textarea"
import styles from "./addNoteModal.module.scss"

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
			dialogClassName={styles.dialog}
			className={styles.modal}
			centered
		>
			<Form
				onSubmit={handleSubmit(onSubmit, handleError)}
				handleError={handleError}
			>
				<Input fieldName='title' placeHolder='Title' type='text' />

				<TextArea fieldName='description' placeholder="Description" />
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
