import { Article } from '@/api/hooks/getUserNotes'
import NoteCard from '../notecard/NoteCard'
import styles from './NotePageLayout.module.scss'

interface NotePageLayoutProps {
	children: React.ReactNode
	articles: Article[]
	loading: boolean
	refetch: () => void
}

const NotePageLayout = ({
	children,
	articles,
	loading,
	refetch,
}: NotePageLayoutProps) => {
	return (
		<div className={styles['note_page_layout']}>
			<div className={styles['create-note-container']}>{children}</div>
			<div className={styles['notes']}>
				{articles.map((note) => (
					<NoteCard removeNote={} refetch={refetch} note={note} />
				))}
			</div>
		</div>
	)
}

export default NotePageLayout
