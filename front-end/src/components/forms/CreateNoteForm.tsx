import { createNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { Box, FormGroup, Input } from '@mui/material'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useClickAway } from 'react-use'
import NoteOrderButtons from '../NoteOrderButtons/NoteOrderButtons'
import styles from './CreateNoteForm.module.scss'

interface FormData {
	title: string
	description: string
}

interface CreateNoteInterface {
	sortBy: 'asc' | 'desc'
	setSortBy: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>
	refetch: any
}

const CreateNote = ({ refetch, sortBy, setSortBy }: CreateNoteInterface) => {
	const [focused, setFocused] = useState(false)
	const user = useUserStore()
	const submitRef = useRef(null)

	const form = useForm<FormData>()

	const onSubmit = form.handleSubmit((data) => {
		if (data.title || data.description !== '') {
			createNote(
				data,
				user.currentUser?.token,
				user.currentUser?.email,
			).then((res) => {
				if (res) {
					form.reset()
					refetch()
					setFocused(false)
				}
			})
		}
	})

	const handleClickAway = () => {
		if (form.formState.touchedFields) {
			onSubmit()
		}
		setFocused(false)
	}

	const handleFocus = () => {
		setFocused(true)
	}

	useClickAway(submitRef, handleClickAway)

	return (
		<Box ref={submitRef} className={styles.container}>
			<form onSubmit={onSubmit} className={styles.form}>
				<FormGroup className={styles.formgroup}>
					<Box className={styles.inputgroup}>
						<Input
							{...form.register('title')}
							className={styles.title}
							hidden={!focused}
							aria-label="title"
						/>
						<div className={styles.inputwithtoggle}>
							<Input
								{...form.register('description')}
								className={styles.description}
								onFocus={handleFocus}
								placeholder="Take a note..."
								aria-label="description"
							/>
							<NoteOrderButtons
								setSortBy={setSortBy}
								sortBy={sortBy}
							/>
						</div>
					</Box>
				</FormGroup>
			</form>
		</Box>
	)
}

export default CreateNote
