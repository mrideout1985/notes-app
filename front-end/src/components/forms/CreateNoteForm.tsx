import { createNote, deleteNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { FormGroup, Label, Input, Form } from 'reactstrap'
import { useClickAway } from 'react-use'
import styles from './CreateNoteForm.module.scss'
import useGetUserNotes from '@/api/hooks/getUserNotes'

interface FormData {
	title: string
	description: string
}

const CreateNote = () => {
	const [focused, setFocused] = useState(false)
	const user = useUserStore()
	const submitRef = useRef(null)

	const {
		handleSubmit,
		reset,
		register,
		watch,
		formState: { isDirty },
	} = useForm<FormData>()

	const onSubmit = handleSubmit((data) => {
		console.log(data)
		if (data.title || data.description !== '') {
			createNote(
				data as FormData,
				user.currentUser?.token,
				user.currentUser?.email,
			).then((res) => {
				if (res) {
					reset()
					setFocused(false)
				}
			})
		}
	})

	const handleClickAway = () => {
		if (isDirty) {
			onSubmit()
		}
		setFocused(false)
	}

	const handleFocus = () => {
		setFocused(true)
	}

	useClickAway(submitRef, handleClickAway)

	return (
		<div ref={submitRef} className={styles.container}>
			<Form onSubmit={onSubmit} className={styles.form}>
				<FormGroup className={styles.formgroup}>
					<input
						{...register('title')}
						className={styles.title}
						hidden={!focused}
					/>
					<input
						{...register('description')}
						className={styles.description}
						onFocus={handleFocus}
						placeholder="Take a note..."
					/>
				</FormGroup>
			</Form>
		</div>
	)
}

export default CreateNote
