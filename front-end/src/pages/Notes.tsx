import useGetUserNotes, { Data } from '@/api/hooks/getUserNotes'
import { getUserNotes } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import useUserStore from '@/stores/authstore'
import styles from '../pages/Notes.module.scss'
import { useEffect } from 'react'

const Notes = () => {
	const { data, done, error, refetch } = useGetUserNotes()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<CreateNote />
			</div>
			<div>{data?.map((el) => el.description)}</div>
		</div>
	)
}

export default Notes
