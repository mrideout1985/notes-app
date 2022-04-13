import React from "react"
import Modal from "react-bootstrap/Modal"
import SvgXCircle from "../../../../components/icons/XCircle"
import SvgCheckCircle from "../../../../components/icons/CheckCircle"
import { useFormContext } from "react-hook-form"
import { notesApi } from "../../../../services/noteService"
import { useAuth } from "../../../../hooks/useAuth"
import { Form } from "../../../form/form"
import { Input } from "../../../form/input"
import { TextArea } from "../../../form/textarea"
import styles from "./editNoteModal.module.scss"

type EditNoteModalProps = {
	show: boolean
	fetchNotes?: () => void
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
	setShow: React.Dispatch<React.SetStateAction<boolean>>
	id: string
	description: string
	title: string
}

const EditNoteModal = ({
	fetchNotes,
	setSubmitting,
	show,
	setShow,
	id,
	description,
	title
}: EditNoteModalProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		resetField,
	} = useFormContext()

	const editNotes = () => {}

	const onSubmit = async (data: any) => {
		setSubmitting(true)

		try {
			await notesApi.updateNote(id, data)
		} finally {
			setShow(false)
		}

		editNotes()
		setSubmitting(false)
		resetField("title")
		resetField("description")
	}

	const defaultValues = {
		title: title,
		description: description,
	}

	const handleError = (errors: any) => {}
	

	return (
		<Modal
			show={show}
			backdrop='static'
			keyboard={false}
			size='lg'
			className={styles.modal}
			dialogClassName={styles.dialog}
			centered
		>
			<Form
				onSubmit={handleSubmit(onSubmit, handleError)}
				handleError={handleError}
			>
			<Input fieldName="title" type="text" defaultValue={defaultValues} placeHolder="Title"   />
			<TextArea fieldName="description" defaultValue={defaultValues} placeholder="Description"/>
				
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

export { EditNoteModal }
