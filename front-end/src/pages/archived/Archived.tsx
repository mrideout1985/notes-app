import { Masonry } from '@mui/lab'
import { useCallback, useState } from 'react'
import useGetArchivedUserNotes from '../../api/hooks/getUserArchivedNotes'
import useHandleArchiveNotes from '../../api/hooks/useHandleArchive'
import { deleteNote, updateNote } from '../../api/services/services'
import NoteCard, { NoteCardProps } from '../../components/notecard/NoteCard'
import useUserStore from '../../stores/authstore'
import styles from './Archived.module.scss'

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

	const { error, isLoading, isValidating, mutate, notes } =
		useGetArchivedUserNotes({
			email: store.currentUser?.email,
			sortBy: sortBy,
		})

	const { handleArchiveNotes } = useHandleArchiveNotes(mutate)

	const removeNote = async (id: string) => {
		await deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				mutate()
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
							mutate()
							func()
						}
					})
				}
			}),

		[],
	)

	const handleRemoveFromArchive = (id: string) => {
		handleArchiveNotes(id, false).then((res) => {
			if (res.status === 200) {
				mutate()
			}
		})
	}

	const handleDisplayNotes = () => {
		if (notes !== undefined) {
			return notes.map((note: NoteCardProps) => (
				<NoteCard
					removeNote={removeNote}
					key={note.id}
					archiveNote={handleRemoveFromArchive}
					updateNote={updateUserNote}
					description={note.description}
					title={note.title}
					id={note.id}
				/>
			))
		}
	}

	return (
		<>
			<div className={styles['note-page-layout']}>
				<Masonry
					columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
					spacing={2}
					className={styles['notes']}
				>
					{handleDisplayNotes()}
				</Masonry>
			</div>
		</>
	)
}

export default Archived
