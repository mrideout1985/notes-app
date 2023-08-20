import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { Card, CardContent, IconButton, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
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
	const noteCardFocus = useRef<HTMLDivElement>(null)
	const firstFocusableElement = useRef<HTMLButtonElement>(null)
	const lastFocusableElement = useRef<HTMLButtonElement>(null)

	
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
		  if (!noteCardFocus.current?.contains(e.target as Node)) {
			return;
		  }
	
		  const focusableElements: NodeListOf<HTMLElement> = noteCardFocus.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		  const firstFocusableElement: HTMLElement = focusableElements[0];
		  const lastFocusableElement: HTMLElement = focusableElements[focusableElements.length - 1];
	
		  if (e.key === 'Tab' && !e.shiftKey && document.activeElement === lastFocusableElement) {
			firstFocusableElement.focus();
			e.preventDefault();
		  } else if (e.key === 'Tab' && e.shiftKey && document.activeElement === firstFocusableElement) {
			lastFocusableElement.focus();
			e.preventDefault();
		  }

		  if (e.key === 'Escape') {
			noteCardFocus.current?.focus();
		  }

		
		};
	
		document.addEventListener('keydown', handleKeyDown);
	
		return () => {
		  document.removeEventListener('keydown', handleKeyDown);
		};
	  }, []);


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
		return 'small'
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
				elevation={4}
				ref={noteCardFocus}
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
						ref={firstFocusableElement}

					>
						<DeleteIcon />
					</IconButton>
					{handleRenderArchiveButton()}
					<IconButton
						aria-label={'Edit Button'}
						size="small"
						onClick={() => setOpenModal(true)}
						ref={lastFocusableElement}
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
