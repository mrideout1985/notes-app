import { createArticle } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import { AxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormGroup, Label, Input, Form } from 'reactstrap'
import styles from './CreateNote.module.scss'

const CreateNote = () => {
	const [focused, setFocused] = useState(false)
	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useFormContext()
	const user = useUserStore()
	const token = localStorage.getItem('token')
	const titleRef = useRef<boolean>()
	const descriptionRef = useRef<boolean>(null)

	const onSubmit = handleSubmit((data) =>
		createArticle(data, token, user.currentUser?.email).then((res) => {
			if (res) {
				reset()
			}
		}),
	)

	const handleFocus = () => {
		setFocused(true)
		titleRef.current = false
	}

	const handleBlurr = () => {
		setFocused(false)
	}

	return (
		<Form onSubmit={onSubmit} className={styles.form}>
			<FormGroup className={styles.formgroup}>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<>
							<Label htmlFor="title">Title</Label>
							<Input id="title" type="text" {...field} />
						</>
					)}
					defaultValue=""
				/>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<>
							<Label htmlFor="description">Description</Label>
							<Input
								onFocus={handleFocus}
								onBlurCapture={handleBlurr}
								id="description"
								type="text"
								{...field}
							/>
						</>
					)}
					defaultValue=""
				/>
				<Input type="submit" />
			</FormGroup>
		</Form>
	)
}

export default CreateNote
