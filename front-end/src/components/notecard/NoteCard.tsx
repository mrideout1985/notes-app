import { Button, Card, CardContent, Typography } from '@mui/material'
import { useState } from 'react'
import { Edit, Trash } from '../icons'
import NoteCardModal from '../notecard-modal/NoteCardModal'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	title: string | undefined
	description: string
	id: string
	removeNote: (id: string) => void
	updateNote: (id: string, func: any) => void
	register: any
	setValue: any
}

const NoteCard = ({
	title,
	description,
	id,
	removeNote,
	updateNote,
	register,
	setValue,
}: NoteCardProps) => {
	const [openModal, setOpenModal] = useState(false)
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
		<>
			<Card
				className={`${styles['note-card']} ${
					styles[determineCardSize()]
				}`}
			>
				<CardContent className={styles['card-body']}>
					{title && <Typography variant="h5">{title}</Typography>}
					<Typography className={styles['description']}>
						{description}
					</Typography>
				</CardContent>
				<div className={styles['footer']}>
					<Button onClick={() => removeNote(id)}>
						<Trash />
					</Button>
					<Button onClick={() => setOpenModal(true)}>
						<Edit />
					</Button>
				</div>
			</Card>
			{openModal && (
				<NoteCardModal
					title={title}
					id={id}
					description={description}
					open={openModal}
					updateNote={updateNote}
					register={register}
					handleClose={() => setOpenModal(false)}
				/>
			)}
		</>
	)
}

export default NoteCard
