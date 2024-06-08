import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import styles from './NoteCard.module.scss'
import { NoteCardModal } from '../NoteCardModal'

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

	return (
		<>
			<Card className={styles['note-card']} tabIndex={0} elevation={4}>
				<CardContent className={styles['card-body']}>
					<Typography
						variant="h6"
						className={styles.title}
						aria-label={'Card Title'}
					>
						{title}
					</Typography>
					<Typography
						className={styles['description']}
						variant="body2"
						aria-label={'Card Description'}
					>
						{description}
					</Typography>
				</CardContent>
				<Box className={styles.footer}>
					<IconButton
						aria-label={'Edit Button'}
						size="small"
						onClick={() => setOpenModal(true)}
					>
						<EditIcon />
					</IconButton>
					{window.location.pathname === '/archived' ? (
						<IconButton
							aria-label={'Restore note from archive button'}
							onClick={() => archiveNote(id)}
						>
							<UnarchiveIcon />
						</IconButton>
					) : (
						<IconButton
							onClick={() => archiveNote(id)}
							aria-label={'Archive note button'}
						>
							<ArchiveIcon />
						</IconButton>
					)}
					<IconButton
						size="small"
						onClick={() => removeNote(id)}
						aria-label={'Delete Button'}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
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
