import { updateArticle } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { Controller, useFormContext } from 'react-hook-form'
import { Card, Form, FormGroup, Input, Modal } from 'reactstrap'
import { FormValues } from '../forms/CreateNoteForm'

interface NoteCardModalInterface {
	open: boolean
	title: string
	description: string
	refetch: { execute: () => Promise<void> }
	toggle: any
}

const NoteCardModal = ({
	open,
	title,
	description,
	refetch,
	toggle,
}: NoteCardModalInterface) => {
	const user = useUserStore()

	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { isDirty },
	} = useFormContext<FormValues>()

	const onSubmit = handleSubmit((data: FormValues) => {
		if (data.title || data.description !== '') {
			updateArticle(
				data,
				user.currentUser?.token,
				user.currentUser?.email,
			).then((res) => {
				if (res) {
					reset()
					refetch.execute()
				}
			})
		}
	})

	const handleOnClose = () => {
		onSubmit()
	}

	return (
		<Modal backdrop onExit={handleOnClose} toggle={toggle} isOpen={open}>
			<Card>
				<Form onSubmit={onSubmit}>
					<FormGroup>
						<Input
							aria-label="Title"
							spellCheck={true}
							placeholder="Title"
							id="title"
							type="text"
							defaultValue={title}
							{...register('title')}
						/>
						<Input
							aria-label="Title"
							spellCheck={true}
							placeholder="Title"
							id="title"
							type="textarea"
							defaultValue={description}
							{...register('description')}
						/>
					</FormGroup>
				</Form>
			</Card>
		</Modal>
	)
}

export default NoteCardModal
