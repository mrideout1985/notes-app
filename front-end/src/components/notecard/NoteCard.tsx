import { deleteArticle } from '@/api/services/services'
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap'
import { Data } from '../../api/hooks/getUserNotes'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	data: Data
	removeNote: (id: number) => void
}

const NoteCard = ({ data, removeNote }: NoteCardProps) => {
	return (
		<Card className={styles['card-container']}>
			<CardBody>
				{data.title && (
					<CardTitle className={styles['title']}>
						<h5>{data.title}</h5>
					</CardTitle>
				)}
				<div className={styles['description']}>{data.description}</div>
			</CardBody>
			<CardFooter className={styles['footer']}>
				<button onClick={() => removeNote(data.id)}>Delete</button>
			</CardFooter>
		</Card>
	)
}

export default NoteCard
