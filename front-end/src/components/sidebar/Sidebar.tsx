import { NavLink } from 'react-router-dom'
import { BookOpen, Trash } from '../icons'
import styles from './Sidebar.module.scss'

interface SideBarProps {
	open: boolean
}

const Sidebar = ({ open }: SideBarProps) => {
	return (
		<div className={styles.sidebar} aria-expanded={open}>
			<div className={styles.links}>
				<NavLink
					className={({ isActive }) =>
						isActive ? styles.active : styles.notActive
					}
					to={'/'}
				>
					<BookOpen className={styles.icon} />
					<div className={styles.text}>
						<p>Notes</p>
					</div>
				</NavLink>
				<NavLink
					to="/trashbin"
					className={({ isActive }) =>
						isActive ? styles.active : styles.notActive
					}
				>
					<Trash className={styles.icon} />
					<div className={styles.text}>
						<p>Trash</p>
					</div>
				</NavLink>
			</div>
		</div>
	)
}

export default Sidebar
