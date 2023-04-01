import useArticles from '@/api/hooks/getUserNotes'
import { deleteNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { useState } from 'react'
import styles from '../pages/Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

const Notes = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')

	const { articles, refetch } = useArticles({
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
		<div className={styles['container']}>
			<div className={styles['create_note_container']}>
				<CreateNote
					sortBy={sortBy}
					setSortBy={setSortBy}
					refetch={refetch}
				/>
			</div>
			<div className={styles['notes']}>
				{articles?.map((el) => (
					<NoteCard
						removeNote={removeNote}
						note={el}
						refetch={refetch}
					/>
				))}
			</div>
		</div>
	)
}

export default Notes
