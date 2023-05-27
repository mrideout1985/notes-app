import useArticles from '@/api/hooks/getUserNotes'
import { deleteNote, updateNote } from '@/api/services/services'
import CreateNote from '@/components/forms/CreateNoteForm'
import NoteCard from '@/components/notecard/NoteCard'
import useUserStore from '@/stores/authstore'
import { Masonry } from '@mui/lab'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Notes.module.scss'

interface UseArticlesOptions {
	sortBy: 'asc' | 'desc'
}

const Notes = () => {
	const store = useUserStore()
	const [sortBy, setSortBy] = useState<UseArticlesOptions['sortBy']>('desc')
	const [openModal, setOpenModal] = useState(false)
	const { articles, refetch, error, loading } = useArticles({
		email: store.currentUser?.email,
		sortBy: sortBy,
	})
	const { register, handleSubmit, resetField, setValue } = useForm()

	const handleOpen = () => {
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false)
	}

	const removeNote = async (id: string) => {
		await deleteNote(id, store.currentUser?.token).then((res) => {
			if (res.status === 200) {
				refetch()
			}
		})
	}

	const updateUserNote = handleSubmit(async (data) => {
		if (data.title || data.description !== '') {
			await updateNote(
				data as { title: string; description: string; id: string },
				store.currentUser?.token,
				store.currentUser?.email,
			)
		}
	})

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
				columns={{ sm: 1, md: 3, lg: 4, xl: 6 }}
				spacing={2}
				className={styles['notes']}
			>
				{articles.map((note) => (
					<NoteCard
						removeNote={removeNote}
						handleOpen={handleOpen}
						open={openModal}
						note={note}
						updateNote={updateUserNote}
						handleClose={handleClose}
						register={register}
						setValue={setValue}
					/>
				))}
			</Masonry>
		</div>
	)
}

export default Notes
