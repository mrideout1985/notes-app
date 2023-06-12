import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { Card, CardContent, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import NoteCardModal from '../notecard-modal/NoteCardModal'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	title: string | undefined
	description: string
	id: string
	removeNote: (id: string) => void
	updateNote: (id: string, func: any, handleSubmit: any) => void
	archiveNote: (id: string) => void
}

const NoteCard = ({
	title,
	description,
	id,
	removeNote,
	updateNote,
	archiveNote,
}: NoteCardProps) => {
	const [openModal, setOpenModal] = useState(false)

	const determineCardSize = () => {
		if (description.length < 100) {
			return 'small'
		}
		if (description.length >= 100 && description.length <= 350) {
			return 'medium'
		}
		if (description.length > 350) {
			return 'large'
		}
		return 'medium'
	}

	const handleRenderArchiveButton = () => {
		if (window.location.pathname === '/archived') {
			return (
				<IconButton
					aria-label={'Restore note from archive button'}
					onClick={() => archiveNote(id)}
				>
					<UnarchiveIcon />
				</IconButton>
			)
		}
		return (
			<IconButton
				onClick={() => archiveNote(id)}
				aria-label={'Archive note button'}
			>
				<ArchiveIcon />
			</IconButton>
		)
	}

	return (
		<>
			<Card
				className={`${styles['note-card']} ${
					styles[determineCardSize()]
				}`}
				tabIndex={0}
			>
				<CardContent className={styles['card-body']}>
					{title && (
						<Typography
							variant="h5"
							className={styles.title}
							aria-label={'Card Title'}
						>
							{title}
						</Typography>
					)}
					<Typography
						className={styles['description']}
						aria-label={'Card Description'}
					>
						{description}
					</Typography>
				</CardContent>
				<div className={styles['footer']}>
					<IconButton
						size="small"
						onClick={() => removeNote(id)}
						aria-label={'Delete Button'}
					>
						<DeleteIcon />
					</IconButton>
					{handleRenderArchiveButton()}
					<IconButton
						aria-label={'Edit Button'}
						size="small"
						onClick={() => setOpenModal(true)}
					>
						<EditIcon />
					</IconButton>
				</div>
			</Card>
			{openModal && (
				<NoteCardModal
					title={title}
					id={id}
					description={description}
					open={openModal}
					updateNote={updateNote}
					handleClose={() => setOpenModal(false)}
				/>
			)}
		</>
	)
}

export default NoteCard
