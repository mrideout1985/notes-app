import { createArticle } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormGroup, Label, Input, Form } from 'reactstrap'
import { useClickAway } from 'react-use'
import styles from './CreateNoteForm.module.scss'

export type FormValues = {
	title: string
	description: string
}

const CreateNote = () => {
	const [focused, setFocused] = useState(false)
	const user = useUserStore()
	const token = localStorage.getItem('token')
	const submitRef = useRef(null)

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useFormContext<FormValues>()

	const onSubmit = handleSubmit((data: FormValues) => {
		if (data.title || data.description !== '') {
			createArticle(data, token, user.currentUser?.email).then((res) => {
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
					<Controller
						name="title"
						control={control}
						render={({ field }) => (
							<div className={styles.input}>
								<Input
									aria-label="Title"
									aria-hidden={focused}
									spellCheck={true}
									placeholder="Title"
									className={styles.title}
									id="title"
									type="text"
									{...field}
								/>
							</div>
						)}
						defaultValue=""
					/>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<div className={styles.input}>
								<Input
									onFocus={handleFocus}
									className={styles.description}
									spellCheck={true}
									aria-label="Take a note..."
									placeholder="Take a note..."
									id="description"
									type="text"
									{...field}
								/>
							</div>
						)}
						defaultValue=""
					/>
				</FormGroup>
			</Form>
		</div>
	)
}

export default CreateNote
