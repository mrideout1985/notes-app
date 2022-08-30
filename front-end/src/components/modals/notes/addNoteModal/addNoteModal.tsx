import React from "react"
import Modal from "react-bootstrap/Modal"
import SvgXCircle from "../../../icons/XCircle"
import SvgCheckCircle from "../../../icons/CheckCircle"
import { useFormContext } from "react-hook-form"
import { notesApi } from "../../../../services/noteService"
import { Form } from "../../../form/form"
import { Input } from "../../../form/input"
import { TextArea } from "../../../form/textarea"
import styles from "./addNoteModal.module.scss"
import useUserStore from "../../../../stores/store"

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
	const { handleSubmit, resetField } = useFormContext()
	const { currentUser } = useUserStore()
	const onSubmit = async (data: any) => {
		setSubmitting(true)
		try {
			await notesApi.addNote({
				...data,
				completed: false,
				email: currentUser.email,
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
			size='lg'
			dialogClassName={styles.dialog}
			className={styles.modal}
			centered
		>
			<Form
				onSubmit={handleSubmit(onSubmit, handleError)}
				handleError={handleError}
			>
				<Input fieldName='title' type='text' label='Title' />
				<TextArea fieldName='description' label='description' />
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
