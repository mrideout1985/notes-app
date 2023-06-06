import useHandleGetArchivedNotes from '@/api/hooks/getUserArchivedNotes'
import useHandleArchiveNotes from '@/api/hooks/useHandleArchive'
import { deleteNote, updateNote } from '@/api/services/services'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { Masonry } from '@mui/lab'
import { Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { mutate } from 'swr'
import styles from './Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

interface FormValues {
	title: string
	description: string
}

const Archived = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')
	const { articles, error, loading, refetch } = useHandleGetArchivedNotes({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})
	const { handleArchiveNotes } = useHandleArchiveNotes()

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
							mutate(articles)
							func()
						}
					})
				}
			}),
		[],
	)

	const handleRemoveFromArchive = (id: string) => {
		handleArchiveNotes(id, false)
	}

	return (
		<>
			<div className={styles['note-page-layout']}>
				<Masonry
					columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
					spacing={2}
					className={styles['notes']}
				>
					{articles === undefined ? (
						<Typography variant="h4" sx={{ textAlign: 'center' }}>
							No Archived Notes
						</Typography>
					) : (
						articles.map((note) => {
							return (
								<NoteCard
									removeNote={removeNote}
									key={note.id}
									updateNote={updateUserNote}
									description={note.description}
									title={note.title}
									id={note.id}
									archiveNote={handleRemoveFromArchive}
								/>
							)
						})
					)}
				</Masonry>
			</div>
		</>
	)
}

export default Archived
