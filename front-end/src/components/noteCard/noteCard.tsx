import React from "react"
import SvgCheckCircle from "../icons/CheckCircle"
import SvgXCircle from "../icons/XCircle"
import styles from "./notecard.module.scss"

interface NoteCardProps {
	title: string
	description: string
	removeNote: any
	id: string
	complete: boolean
	toggleComplete: any
}

const NoteCard = ({
	title,
	description,
	removeNote,
	toggleComplete,
	id,
	complete,
}: NoteCardProps) => {
	return (
		<div className={styles.container}>
			<div
				className={styles.overlay}
				style={{ backgroundColor: complete ? "#01960162" : "" }}
			/>
			<div className={styles.buttons}>
				<button
					className={styles.complete}
					onClick={() => toggleComplete(id, { completed: !complete })}
				>
					<SvgCheckCircle color={complete ? "red" : "green"} />
				</button>
				<button
					className={styles.delete}
					onClick={() => removeNote(id)}
				>
					<SvgXCircle />
				</button>
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{description}</div>
			<div>{JSON.stringify(complete)}</div>
		</div>
	)
}

export { NoteCard }
