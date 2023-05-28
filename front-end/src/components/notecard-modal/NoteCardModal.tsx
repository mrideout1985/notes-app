import {
	Box,
	Button,
	Card,
	CardContent,
	FormGroup,
	Modal,
	TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import styles from './NoteCardModal.module.scss'

interface NoteCardModalInterface {
	open: boolean
	title: string | undefined
	description: string
	updateNote: any
	handleClose: () => void
	id: string
}

const NoteCardModal = ({
	open,
	title,
	description,
	updateNote,
	handleClose,
	id,
}: NoteCardModalInterface) => {
	const { register, handleSubmit, watch } = useForm()

	return (
		<Modal className={styles.modal} open={open}>
			<Card className={styles['note-card']}>
				<form
					onSubmit={updateNote(id, handleClose, handleSubmit)}
					className={styles.form}
				>
					<CardContent className={styles['card-body']}>
						<FormGroup>
							<TextField
								{...register('title')}
								className={styles.title}
								defaultValue={title}
								aria-label="title"
								multiline
							/>
							<TextField
								multiline
								{...register('description')}
								className={styles.description}
								placeholder="Take a note..."
								defaultValue={description}
								aria-label="description"
							/>
						</FormGroup>
					</CardContent>
					<Box component="div" className={styles['footer']}>
						{watch('title') || watch('description') ? (
							<Button type="submit">Complete</Button>
						) : (
							<Button disabled type="submit">
								Complete
							</Button>
						)}
						<Button onClick={handleClose}>Cancel</Button>
					</Box>
				</form>
			</Card>
		</Modal>
	)
}

export default NoteCardModal
