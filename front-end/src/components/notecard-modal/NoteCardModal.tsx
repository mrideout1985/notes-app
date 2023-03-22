import { updateNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { FormEventHandler } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { Card, Form, FormGroup, Input, Modal } from 'reactstrap'
import styles from '../forms/CreateNoteForm.module.scss'

interface NoteCardModalInterface {
	open: boolean
	refetch: { execute: () => Promise<void> }
	toggle: any
	id: string
	title: string
	description: string
	handleOnClose: () => void
	handleOnSubmit: FormEventHandler<HTMLFormElement>
}

const NoteCardModal = ({
	open,
	refetch,
	toggle,
	id,
	title,
	description,
	handleOnClose,
	handleOnSubmit,
}: NoteCardModalInterface) => {
	const user = useUserStore()

	const { register, handleSubmit, resetField } = useForm()

	const onSubmit = handleSubmit((data) => {
		if (data.title || data.description !== '') {
			updateNote(
				data as any,
				user.currentUser?.token,
				user.currentUser?.email,
				id,
			)
		}
		resetField('title')
		resetField('description')
		refetch.execute()
		handleOnClose()
	})

	return (
		<Modal backdrop toggle={toggle} isOpen={open}>
			<Card className={styles.container}>
				<Form onSubmit={onSubmit} className={styles.form}>
					<FormGroup className={styles.formgroup}>
						<input
							{...register('title')}
							className={styles.title}
							defaultValue={title}
							aria-label="title"
						/>
						<input
							{...register('description')}
							className={styles.description}
							placeholder="Take a note..."
							defaultValue={description}
							aria-label="description"
						/>
					</FormGroup>
					<input type="submit" value="Complete" />
				</Form>
			</Card>
		</Modal>
	)
}

export default NoteCardModal
