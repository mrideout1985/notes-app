import React from "react"
import SvgXCircle from "../../../icons/XCircle"
import SvgCheckCircle from "../../../icons/CheckCircle"
import { useFormContext } from "react-hook-form"
import { notesApi } from "../../../../services/noteService"
import { Form } from "../../../form/form"
import { Input } from "../../../form/input"
import { TextArea } from "../../../form/textarea"
import styles from "./addNoteModal.module.scss"
import useUserStore from "../../../../stores/store"
import Modal from "react-bootstrap/Modal"

type AddNoteModalProps = {
	show: boolean
	fetchNotes: () => void
	setSubmitting: boolean
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
		try {
			await notesApi.addNote({
				...data,
				completed: false,
				email: currentUser,
			})
		} finally {
			setShow(false)
		}
		fetchNotes()
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
