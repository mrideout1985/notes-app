import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap'
import { Data } from '../../api/hooks/getUserNotes'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	data: Data
}

const NoteCard = (data: NoteCardProps) => {
	const removeNote = (id: number) => {}

	return (
		<Card className={styles['card-container']}>
			<CardBody>
				{data.data.title && (
					<CardTitle className={styles['title']}>
						<h5>{data.data.title}</h5>
					</CardTitle>
				)}
				<div className={styles['description']}>
					{data.data.description}
				</div>
			</CardBody>
			<CardFooter className={styles['footer']}>
				<button>Delete</button>
			</CardFooter>
		</Card>
	)
}

export default NoteCard
