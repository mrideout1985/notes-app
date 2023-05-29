import useGetUserNotes from '@/api/hooks/getUserNotes'
import useHandleArchiveNotes from '@/api/hooks/useHandleArchive'
import { deleteNote, updateNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { Masonry } from '@mui/lab'
import { useCallback, useEffect, useState } from 'react'
import styles from './Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

interface FormValues {
	title: string
	description: string
}

const Notes = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')
	const { handleArchiveNotes } = useHandleArchiveNotes()
	const { articles, refetch, error, loading } = useGetUserNotes({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})

	const removeNote = async (id: string) => {
		await deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				refetch()
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
							refetch()
							func()
						}
					})
				}
			}),
		[],
	)

	const handleAddToArchive = (id: string) => {
		handleArchiveNotes(id, true)
	}

	useEffect(() => {
		refetch()
	}, [articles])

	return (
		<>
			<div className={styles['note-page-layout']}>
				<div className={styles['create-note-container']}>
					<CreateNote
						refetch={refetch}
						setSortBy={setSortBy}
						sortBy={sortBy}
					/>
				</div>
				<Masonry
					columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
					spacing={2}
					className={styles['notes']}
				>
					{articles.map((note) => {
						return (
							<NoteCard
								removeNote={removeNote}
								key={note.id}
								archiveNote={handleAddToArchive}
								updateNote={updateUserNote}
								description={note.description}
								title={note.title}
								id={note.id}
							/>
						)
					})}
				</Masonry>
			</div>
		</>
	)
}

export default Notes
