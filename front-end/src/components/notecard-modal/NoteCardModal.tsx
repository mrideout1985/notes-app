import { updateNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import {
	Box,
	Button,
	Card,
	CardContent,
	FormGroup,
	Input,
	Modal,
} from '@mui/material'
import { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import styles from './NoteCardModal.module.scss'

interface NoteCardModalInterface {
	open: boolean
	refetch: () => void
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
		refetch()
		resetField('title')
		resetField('description')
		handleOnClose()
	})

	const determineCardSize = () => {
		if (description.length < 150) {
			return 'small'
		}
		if (description.length > 150 && description.length < 250) {
			return 'medium'
		}
		if (description.length > 250) {
			return 'large'
		}
		return 'medium'
	}

	return (
		<Modal className={styles.modal} open={open}>
			<Card
				className={`${styles['note-card']} ${
					styles[determineCardSize()]
				}`}
			>
				<form onSubmit={onSubmit} className={styles.form}>
					<CardContent className={styles['card-body']}>
						<FormGroup>
							<Input
								{...register('title')}
								className={styles.title}
								defaultValue={title}
								aria-label="title"
								multiline
							/>
							<Input
								multiline
								{...register('description')}
								className={styles.description}
								placeholder="Take a note..."
								defaultValue={description}
								aria-label="description"
							/>
						</FormGroup>
					</CardContent>
				</form>
				<Box component="div" className={styles['footer']}>
					<Button variant="contained" type="submit">
						Complete
					</Button>
					<Button onClick={toggle}>Cancel</Button>
				</Box>
			</Card>
		</Modal>
	)
}

export default NoteCardModal
