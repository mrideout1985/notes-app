import { Masonry } from '@mui/lab'
import { Box, CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'
import useGetUserNotes from '../api/hooks/getUserNotes'
import useHandleArchiveNotes from '../api/hooks/useHandleArchive'
import { createNote, deleteNote, updateNote } from '../api/services/services'
import CreateNote from '../components/forms/CreateNoteForm'
import NoteCard, { NoteCardProps } from '../components/notecard/NoteCard'
import useUserStore from '../stores/authstore'
import styles from './Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

export interface FormValues {
	title: string
	description: string
}

const Notes = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')
	const user = useUserStore()

	const { notes, error, isLoading, mutate } = useGetUserNotes({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})

	const { handleArchiveNotes } = useHandleArchiveNotes(mutate)

	const createUserNote = useCallback(
		(
			handleSubmit: UseFormHandleSubmit<FormValues>,
			isFocused: React.Dispatch<React.SetStateAction<boolean>>,
		) =>
			handleSubmit(async (data: FormValues) => {
				if (data.title || data.description !== '') {
					createNote(
						data,
						user.currentUser?.token,
						user.currentUser?.email,
					).then((res) => {
						if (res.status === 201) {
							isFocused(false)
							mutate()
						}
					})
				}
			}),
		[],
	)

	const removeNote = async (id: string) => {
		await deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				mutate()
			}
		})
	}

	const updateUserNote = useCallback(
		(id: string, func: any, handleSubmit: any) =>
			handleSubmit(async (data: FormValues) => {
				if (data.title || data.description !== '') {
					await updateNote(
						data as { title: string; description: string },
						store.currentUser?.token,
						store.currentUser?.email,
						id,
					).then((res) => {
						if (res?.status === 200) {
							func()
							mutate()
						}
					})
				}
			}),
		[],
	)

	const handleAddToArchive = (id: string) => {
		handleArchiveNotes(id, true).then((res) => {
			mutate()
		})
	}

	return (
		<>
			{!notes ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						width: '100%',
						zIndex: 100,
					}}
				>
					<CircularProgress color="error" />
				</Box>
			) : (
				<div className={styles['note-page-layout']}>
					<div className={styles['create-note-container']}>
						<CreateNote
							setSortBy={setSortBy}
							sortBy={sortBy}
							createUserNote={createUserNote}
						/>
					</div>
					<Masonry
						columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
						spacing={2}
						className={styles['notes']}
						children={notes.map((note: NoteCardProps) => (
							<NoteCard
								removeNote={removeNote}
								key={note.id}
								archiveNote={handleAddToArchive}
								updateNote={updateUserNote}
								description={note.description}
								title={note.title}
								id={note.id}
							/>
						))}
					/>
				</div>
			)}
		</>
	)
}

export default Notes
