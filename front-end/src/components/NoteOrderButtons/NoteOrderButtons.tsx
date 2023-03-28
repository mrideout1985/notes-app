import { ButtonGroup, ButtonToggle } from 'reactstrap'
import { ChevronDown, ChevronUp } from '../icons'

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
		<ButtonGroup>
			<ButtonToggle
				onClick={() => handleToggleSortBy(sortBy)}
				color="white"
			>
				{sortBy === 'desc' ? (
					<ChevronUp size={22} stroke="#E64980" />
				) : (
					<ChevronDown size={22} stroke="#E64980" />
				)}
			</ButtonToggle>
		</ButtonGroup>
	)
}

export default NoteOrderButtons
