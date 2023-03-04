import useGetUserNotes, { Data } from '@/api/hooks/getUserNotes'
import { deleteNote, getUserNotes } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import useUserStore from '@/stores/authstore'
import styles from '../pages/Notes.module.scss'
import { useEffect } from 'react'
import NoteCard from '@/components/notecard/NoteCard'
import { useForm } from 'react-hook-form'

const Notes = () => {
	const { data, done, error, refetch } = useGetUserNotes()

	const removeNote = (id: number) => {
		deleteNote(id).then((res) => {
			if (res.status === 200) {
				refetch.execute()
			}
		})
	}

	return (
		<div className={styles['container']}>
			<div className={styles['header']}>
				<CreateNote />
			</div>
			<div className={styles['notes']}>
				{data?.map((el) => (
					<NoteCard
						refetch={refetch}
						key={el.id}
						note={el}
						removeNote={removeNote}
					/>
				))}
			</div>
		</div>
	)
}

export default Notes
