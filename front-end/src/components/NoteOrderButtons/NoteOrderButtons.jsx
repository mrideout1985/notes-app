import { ChevronDown, ChevronUp } from '../icons';
import styles from './NoteOrderButtons.module.scss';
const NoteOrderButtons = ({ sortBy, setSortBy }) => {
    const handleToggleSortBy = (order) => {
        if (sortBy === 'desc') {
            setSortBy('asc');
        }
        else {
            setSortBy('desc');
        }
    };
    return (<div className={styles['button_group']}>
			<button aria-label="note order toggle button" onClick={() => handleToggleSortBy(sortBy)} color="white">
				{sortBy === 'desc' ? (<ChevronUp size={23} stroke="#FFF"/>) : (<ChevronDown size={23} stroke="#FFF"/>)}
			</button>
		</div>);
};
export default NoteOrderButtons;
