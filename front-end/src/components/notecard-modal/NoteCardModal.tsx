import {
	Box,
	Button,
	Card,
	CardContent,
	FormGroup,
	Modal,
	TextField,
} from '@mui/material'
import styles from './NoteCardModal.module.scss'

interface NoteCardModalInterface {
	open: boolean
	title: string | undefined
	description: string
	updateNote: any
	register: any
	handleClose: () => void
	id: string
}

const NoteCardModal = ({
	open,
	title,
	description,
	updateNote,
	register,
	handleClose,
	id,
}: NoteCardModalInterface) => {
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
				<form
					onSubmit={updateNote(id, handleClose)}
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
						<Button type="submit" />
						<Button onClick={handleClose}>Cancel</Button>
					</Box>
				</form>
			</Card>
		</Modal>
	)
}

export default NoteCardModal
