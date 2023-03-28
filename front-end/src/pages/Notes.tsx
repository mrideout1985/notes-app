import useArticles from '@/api/hooks/getUserNotes'
import { deleteNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import useUserStore from '@/stores/authstore'
import styles from '../pages/Notes.module.scss'
import NoteCard from '@/components/notecard/NoteCard'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'reactstrap'
import { ChevronDown, ChevronUp } from '@/components/icons'
import NoteOrderButtons from '@/components/NoteOrderButtons/NoteOrderButtons'

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
			<div className={styles['header']}>
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
