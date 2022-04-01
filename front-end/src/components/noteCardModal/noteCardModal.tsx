import React from "react"
import Button from "react-bootstrap/esm/Button"
import Modal from "react-bootstrap/Modal"
import styles from "./noteCardModal.module.scss"

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
	return (
		<Modal show={toggleModal} backdrop='static' centered={true}>
			<div>
				<Button onClick={() => setToggleModal(false)}>Close</Button>
			</div>
		</Modal>
	)
}

export { NoteCardModal }
