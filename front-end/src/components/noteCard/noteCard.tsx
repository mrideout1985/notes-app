import React, { useState } from "react"
import SvgCheckCircle from "../icons/CheckCircle"
import SvgPencil from "../icons/Pencil"
import SvgXCircle from "../icons/XCircle"
import { EditNoteModal } from "../modals/notes/editNoteModal/editNoteModal"
import styles from "./notecard.module.scss"

interface NoteCardProps {
	title: string
	description: string
	removeNote: any
	id: string
	complete: boolean
	toggleComplete: any
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
	submitting: boolean
}

const NoteCard = ({
	title,
	description,
	removeNote,
	toggleComplete,
	id,
	complete,
	setSubmitting,
}: NoteCardProps) => {
	const [toggleModal, setToggleModal] = useState(false)

	const handleContainerSize = (description: string) => {
		if (description.length < 150) {
			return styles["small"]
		}
		if (description.length > 150 && description.length < 250) {
			return styles["med"]
		}
		if (description.length > 250) {
			return styles["large"]
		}
	}

	return (
		<>
			<div
				data-complete={complete}
				className={[
					[styles["container"]],
					[handleContainerSize(description)],
				].join(" ")}
			>
				<div className={styles["card"]}>
					<div className={styles["content"]}>
						<div className={styles["title"]}>{title}</div>
						<div className={styles["description"]}>
							{description}
						</div>
					</div>
					<div className={styles["buttons"]}>
						<button
							className={styles["complete"]}
							onClick={() =>
								toggleComplete(id, { completed: !complete })
							}
						>
							<SvgCheckCircle
								color={complete ? "green" : "black"}
							/>
						</button>
						<button
							className={styles["edit"]}
							onClick={() => setToggleModal(true)}
						>
							<SvgPencil size={24} />
						</button>
						<button
							className={styles["delete"]}
							onClick={() => removeNote(id)}
						>
							<SvgXCircle />
						</button>
					</div>
				</div>
			</div>
			<EditNoteModal
				show={toggleModal}
				setSubmitting={setSubmitting}
				setShow={setToggleModal}
				id={id}
				title={title}
				description={description}
			/>
		</>
	)
}

export { NoteCard }
