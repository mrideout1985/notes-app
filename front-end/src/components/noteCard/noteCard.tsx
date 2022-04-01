import React from "react"
import { NavLink } from "react-router-dom"
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
	const handleContainerSize = (description: string) => {
		if (description.length < 50) {
			return styles["small"]
		}
		if (description.length > 50 && description.length < 100) {
			return styles["med"]
		}
		if (description.length > 100) {
			return styles["large"]
		}
	}

	return (
		<div
			className={[
				[styles["container"]],
				[handleContainerSize(description)],
			].join(" ")}
		>
			<div className={styles["container__inner"]}>
				<div className={styles["title"]}>{title}</div>
				<div className={styles["description"]}>{description}</div>
				<div className={styles.buttons}>
					<button
						className={styles.complete}
						onClick={() =>
							toggleComplete(id, { completed: !complete })
						}
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
			</div>
		</div>
	)
}

export { NoteCard }
