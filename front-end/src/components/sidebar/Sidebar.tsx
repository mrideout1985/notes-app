import { NavLink, useLocation } from "react-router-dom";

import unpublished from "../../assets/icons/archive.svg";
import notifications from "../../assets/icons/bell.svg";
import notes from "../../assets/icons/book-open.svg";
import trash from "../../assets/icons/trash.svg";
import styles from "./Sidebar.module.scss";

interface SideBarProps {
  open: boolean;
}

const Sidebar = ({ open }: SideBarProps) => {
  const path = useLocation();

  return (
    <div className={styles.sidebar} aria-expanded={open}>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={"/"}
        >
          <img src={notes} alt="notepad" />
          <div className={styles.text}>
            <p>Notes</p>
          </div>
        </NavLink>
        <NavLink to="/reminders" className={styles.link}>
          <img src={notifications} alt="notifications" />
          <div className={styles.text}>
            <p>Reminders</p>
          </div>
        </NavLink>
        <NavLink to="/drafts" className={styles.link}>
          <img src={unpublished} alt="unpublished" />
          <div className={styles.text}>
            <p>Drafts</p>
          </div>
        </NavLink>
        <NavLink to="/trash" className={styles.link}>
          <img src={trash} alt="trash" />
          <div className={styles.text}>
            <p>Trash</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
