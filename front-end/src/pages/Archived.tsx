import useArticles from '@/api/hooks/getUserNotes'
import { deleteNote, updateNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { Masonry } from '@mui/lab'
import { useCallback, useState } from 'react'
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
	const { articles, refetch, error, loading } = useArticles({
		email: store.currentUser?.email,
		archived: true,
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

export default Archived
