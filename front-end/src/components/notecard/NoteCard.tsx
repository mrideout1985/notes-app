import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import { Data } from '../../api/hooks/getUserNotes'
import styles from './NoteCard.module.scss'

export interface NoteCardProps {
	data: Data
}

const NoteCard = (data: NoteCardProps) => {
	return (
		<div className={styles['card-container']}>
			{data.data.title && (
				<div className={styles['title']}>
					<h5>{data.data.title}</h5>
				</div>
			)}
		</div>
	)
}

export default NoteCard
