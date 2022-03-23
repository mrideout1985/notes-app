import React, { useState } from "react"
import SvgCheckCircle from "../icons/CheckCircle"
import SvgXCircle from "../icons/XCircle"
import styles from "./notecard.module.scss"

interface NoteCardProps {
	title: string
	description: string
	removeNote: any
	id: string
}

const NoteCard = ({ title, description, removeNote, id }: NoteCardProps) => {
	const [complete, setComplete] = useState(false)
	return (
		<div className={styles.container}>
			<div
				className={styles.overlay}
				style={{ backgroundColor: complete ? "#01960162" : "" }}
			/>
			<div className={styles.buttons}>
				<button
					className={styles.complete}
					onClick={() => setComplete(!complete)}
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
		</div>
	)
}

export { NoteCard }
