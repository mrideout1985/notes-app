import { createNote, deleteNote } from '@/api/services/services'
import useUserStore from '@/stores/authstore'
import {
	BaseSyntheticEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import {
	FormGroup,
	Label,
	Input,
	Form,
	InputGroupText,
	InputGroup,
	ButtonToggle,
} from 'reactstrap'
import { useClickAway } from 'react-use'
import styles from './CreateNoteForm.module.scss'
import useGetUserNotes from '@/api/hooks/getUserNotes'
import NoteOrderButtons from '../NoteOrderButtons/NoteOrderButtons'
import { ChevronDown, ChevronUp } from '../icons'

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

	const {
		handleSubmit,
		reset,
		register,
		formState: { isDirty },
	} = useForm<FormData>()

	const onSubmit = handleSubmit((data) => {
		if (data.title || data.description !== '') {
			createNote(
				data,
				user.currentUser?.token,
				user.currentUser?.email,
			).then((res) => {
				if (res) {
					reset()
					refetch()
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

	const handleToggleSortBy = (order: string) => {
		if (sortBy === 'desc') {
			setSortBy('asc')
		} else {
			setSortBy('desc')
		}
	}

	useClickAway(submitRef, handleClickAway)

	return (
		<div ref={submitRef} className={styles.container}>
			<Form onSubmit={onSubmit} className={styles.form}>
				<FormGroup className={styles.formgroup}>
					<InputGroup>
						<div>
							<input
								{...register('title')}
								className={styles.title}
								hidden={!focused}
								aria-label="title"
							/>
							<div className={styles.inputwithtoggle}>
								<input
									{...register('description')}
									className={styles.description}
									onFocus={handleFocus}
									placeholder="Take a note..."
									aria-label="description"
								/>
								<ButtonToggle
									onClick={() => handleToggleSortBy(sortBy)}
									className={styles.sortButton}
								>
									{sortBy === 'desc' ? (
										<ChevronUp size={26} stroke="#E64980" />
									) : (
										<ChevronDown
											size={26}
											stroke="#E64980"
										/>
									)}
								</ButtonToggle>
							</div>
						</div>
					</InputGroup>
				</FormGroup>
			</Form>
		</div>
	)
}

export default CreateNote
