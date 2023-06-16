import { Box, FormGroup, Input } from '@mui/material'
import { useRef, useState } from 'react'
import { UseFormHandleSubmit, useForm } from 'react-hook-form'
import { useClickAway } from 'react-use'
import { FormValues } from '../../pages/Notes'
import NoteOrderButtons from '../NoteOrderButtons/NoteOrderButtons'
import styles from './CreateNoteForm.module.scss'

interface FormData {
	title: string
	description: string
}

interface CreateNoteInterface {
	sortBy: 'asc' | 'desc'
	setSortBy: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>
	createUserNote: (
		handleSubmit: UseFormHandleSubmit<FormValues>,
		setFocused: React.Dispatch<React.SetStateAction<boolean>>,
	) => (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined,
	) => Promise<void>
}

const CreateNote = ({
	sortBy,
	setSortBy,
	createUserNote,
}: CreateNoteInterface) => {
	const [focused, setFocused] = useState(false)
	const submitRef = useRef(null)
	const form = useForm<FormData>()
	const onSubmit = createUserNote(form.handleSubmit, setFocused)

	const handleClickAway = () => {
		if (form.formState.touchedFields) {
			onSubmit()
			form.reset()
		}
		setFocused(false)
	}

	const handleFocus = () => {
		setFocused(true)
	}

	useClickAway(submitRef, handleClickAway)

	return (
		<Box className={styles.container}>
			<form ref={submitRef} onSubmit={onSubmit} className={styles.form}>
				<FormGroup className={styles.formgroup}>
					<Box className={styles.inputgroup}>
						<Input
							{...form.register('title')}
							className={styles.title}
							hidden={!focused}
							aria-label="title"
							placeholder="Title"
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
