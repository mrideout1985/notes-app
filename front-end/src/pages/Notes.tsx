import useArticles from '@/api/hooks/getUserNotes'
import { deleteNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { Masonry } from '@mui/lab'
import { useState } from 'react'
import styles from './Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

const Notes = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')
	const { articles, refetch, error, loading } = useArticles({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})

	const removeNote = (id: string) => {
		deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				refetch()
			}
		})
	}

	return (
		<div className={styles['note-page-layout']}>
			<div className={styles['create-note-container']}>
				<CreateNote
					refetch={refetch}
					setSortBy={setSortBy}
					sortBy={sortBy}
				/>
			</div>
			<Masonry
				columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
				spacing={2}
				className={styles['notes']}
			>
				{articles.map((note) => (
					<NoteCard
						removeNote={removeNote}
						refetch={refetch}
						note={note}
					/>
				))}
			</Masonry>
		</div>
	)
}

export default Notes
