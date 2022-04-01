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
		if (description.length > 50 && description.length < 150) {
			return styles["med"]
		}
		if (description.length > 150) {
			return styles["large"]
		}
	}

	console.log(complete)

	return (
		<div
			data-complete={complete}
			className={[
				[styles["container"]],
				[handleContainerSize(description)],
			].join(" ")}
		>
			<div className={styles["inner"]}>
				<div className={styles["title"]}>{title}</div>
				<div className={styles["description"]}>{description}</div>
				<div className={styles.buttons}>
					<button
						className={styles.complete}
						onClick={() =>
							toggleComplete(id, { completed: !complete })
						}
					>
						<SvgCheckCircle color={complete ? "green" : "red"} />
					</button>
					<button
						className={styles.delete}
						onClick={() => removeNote(id)}
					>
						<SvgXCircle color={"red"} />
					</button>
				</div>
			</div>
		</div>
	)
}

export { NoteCard }
