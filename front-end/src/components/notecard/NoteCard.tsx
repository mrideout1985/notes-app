import { Article } from '@/api/hooks/getUserNotes'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { Edit, Trash } from '../icons'
import NoteCardModal from '../notecard-modal/NoteCardModal'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	note: Article
	removeNote: (id: string) => void
	updateNote: () => void
	register: any
	handleClose: () => void
	handleOpen: () => void
	open: boolean
	setValue: any
}

const NoteCard = ({
	note,
	removeNote,
	updateNote,
	register,
	handleClose,
	handleOpen,
	open,
	setValue,
}: NoteCardProps) => {
	const determineCardSize = () => {
		const description = note.description
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
		<>
			<Card
				className={`${styles['note-card']} ${
					styles[determineCardSize()]
				}`}
			>
				<CardContent className={styles['card-body']}>
					{note.title && (
						<Typography variant="h5">{note.title}</Typography>
					)}
					<Typography className={styles['description']}>
						{note.description}
					</Typography>
				</CardContent>
				<div className={styles['footer']}>
					<Button onClick={() => removeNote(note.id)}>
						<Trash />
					</Button>
					<Button onClick={handleOpen}>
						<Edit />
					</Button>
				</div>
			</Card>
			<NoteCardModal
				title={note.title}
				id={note.id}
				description={note.description}
				open={open}
				updateNote={updateNote}
				register={register}
				handleClose={handleClose}
			/>
		</>
	)
}

export default NoteCard
