import { ChevronDown, ChevronUp } from '../Icons'
import styles from './NoteOrderButtons.module.scss'
export interface NoteOrderButtonsProps {
	sortBy: 'asc' | 'desc'
	setSortBy: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>
}

const NoteOrderButtons = ({ sortBy, setSortBy }: NoteOrderButtonsProps) => {
	const handleToggleSortBy = (order: string) => {
		if (sortBy === 'desc') {
			setSortBy('asc')
		} else {
			setSortBy('desc')
		}
	}

	return (
		<div className={styles['button_group']}>
			<button
				aria-label="note order toggle button"
				onClick={() => handleToggleSortBy(sortBy)}
				color="white"
			>
				{sortBy === 'desc' ? (
					<ChevronUp size={23} stroke="#FFF" />
				) : (
					<ChevronDown size={23} stroke="#FFF" />
				)}
			</button>
		</div>
	)
}

export default NoteOrderButtons
