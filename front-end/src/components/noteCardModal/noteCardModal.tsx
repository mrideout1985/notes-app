import React from "react"
import Button from "react-bootstrap/esm/Button"
import Modal from "react-bootstrap/Modal"
import { useFormContext } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth"
import { Form } from "../form/form"
import { Input } from "../form/input"

type Props = {
	title: string
	description: string
	id: string
	toggleModal: boolean
	setToggleModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NoteCardModal = ({
	title,
	description,
	id,
	toggleModal,
	setToggleModal,
}: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useFormContext()
	const { user } = useAuth()

	const handleError = (errors: any) => {}

	return (
		<Modal show={toggleModal} backdrop='static' centered={true}>
			<Form
				handleError={handleError}
				onSubmit={handleSubmit(handleError)}
			>
				<Input type='text' fieldName='title' placeHolder='title' />
			</Form>

			<Button onClick={() => setToggleModal(false)}>Close</Button>
		</Modal>
	)
}

export { NoteCardModal }
