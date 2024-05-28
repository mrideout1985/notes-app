import ArchiveIcon from '@mui/icons-material/Archive';
import NoteIcon from '@mui/icons-material/Note';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
const Sidebar = ({ open }) => {
    return (<div className={styles.sidebar} aria-expanded={open}>
			<div className={styles.links}>
				<NavLink className={({ isActive }) => isActive ? styles.active : styles.notActive} to={'/'}>
					<NoteIcon className={styles.icon}/>
					<div className={styles.text}>
						<p>Notes</p>
					</div>
				</NavLink>
				<NavLink to="/archived" className={({ isActive }) => isActive ? styles.active : styles.notActive}>
					<ArchiveIcon className={styles.icon}/>
					<div className={styles.text}>
						<p>Archived</p>
					</div>
				</NavLink>
			</div>
		</div>);
};
export default Sidebar;
