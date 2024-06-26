import { Masonry } from '@mui/lab'
import { Box, CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'
import { UseFormHandleSubmit, UseFormReset } from 'react-hook-form'
import useGetUserNotes from '../../api/hooks/getUserNotes'
import useHandleArchiveNotes from '../../api/hooks/useHandleArchive'
import { createNote, deleteNote, updateNote } from '../../api/services/services'
import CreateNote from '../../components/Forms/CreateNoteForm'
import NoteCard, { NoteCardProps } from '../../components/NoteCard/NoteCard'
import useUserStore from '../../stores/authstore'
import styles from './Notes.module.scss'
import { mutate } from 'swr'

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
	console.log(user.currentUser)

	const { notes, error, isLoading } = useGetUserNotes({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})

	const { handleArchiveNotes } = useHandleArchiveNotes(mutate)

	const createUserNote = useCallback(
		(
			handleSubmit: UseFormHandleSubmit<FormValues>,
			isFocused: React.Dispatch<React.SetStateAction<boolean>>,
			reset: UseFormReset<FormValues>,
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
							reset()
							mutate([
								'my-articles',
								user.currentUser?.email,
								sortBy,
							])
						}
					})
				}
			}),
		[],
	)

	const removeNote = async (id: string) => {
		await deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				mutate(['my-articles', user.currentUser?.email, sortBy])
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
							mutate([
								'my-articles',
								user.currentUser?.email,
								sortBy,
							])
						}
					})
				}
			}),
		[],
	)

	const handleAddToArchive = (id: string) => {
		handleArchiveNotes(id, true).then((res) => {
			mutate(['my-articles', user.currentUser?.email, sortBy])
		})
	}

	const handleRenderCard = () => {
		if (!notes) {
			return (
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
			)
		}

		return (
			<Box className={styles['note-page-layout']}>
				<Box className={styles['create-note-container']}>
					<CreateNote createUserNote={createUserNote} />
				</Box>
				<Masonry
					columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
					spacing={2}
					className={styles['notes']}
					children={
						notes &&
						notes.map((note: NoteCardProps) => (
							<NoteCard
								removeNote={removeNote}
								key={note.id}
								archiveNote={handleAddToArchive}
								updateNote={updateUserNote}
								description={note.description}
								title={note.title}
								id={note.id}
							/>
						))
					}
				/>
			</Box>
		)
	}

	return handleRenderCard()
}

export default Notes
