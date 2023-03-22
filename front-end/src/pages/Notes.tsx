import useGetUserNotes, { Data } from '@/api/hooks/getUserNotes'
import { deleteNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import useUserStore from '@/stores/authstore'
import styles from '../pages/Notes.module.scss'
import { useEffect } from 'react'
import NoteCard from '@/components/notecard/NoteCard'

const Notes = () => {
	const { data, done, error, refetch } = useGetUserNotes()
	const token = useUserStore()

	const removeNote = (id: string) => {
		deleteNote(id, token.currentUser?.token).then((res) => {
			if (res.status === 200) refetch.execute()
		})
	}

	let i = 0

	return (
		<div className={styles['container']}>
			<div className={styles['header']}>
				<CreateNote refetch={refetch} />
			</div>
			<div className={styles['notes']}>
				{data?.map((el) => (
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
