import { NavLink } from "react-router-dom";

import { Archive, Bell, BookOpen, Trash } from "../icons";
import styles from "./Sidebar.module.scss";

interface SideBarProps {
  open: boolean;
}

const Sidebar = ({ open }: SideBarProps) => {
  return (
    <div className={styles.sidebar} aria-expanded={open}>
      <div className={styles.links}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={"/"}
        >
          <BookOpen
            stroke={"#212529"}
            fill="#F7F5EB"
            height={"2.5rem"}
            width={"2.5rem"}
            strokeWidth=".2rem"
          />
          <div className={styles.text}>
            <p>Notes</p>
          </div>
        </NavLink>
        <NavLink to="/reminders" className={styles.link}>
          <Bell
            stroke={"#212529"}
            fill="#F7F5EB"
            height={"2.5rem"}
            width={"2.5rem"}
            strokeWidth=".2rem"
          />
          <div className={styles.text}>
            <p>Reminders</p>
          </div>
        </NavLink>
        <NavLink to="/drafts" className={styles.link}>
          <Archive
            stroke={"#212529"}
            fill="#F7F5EB"
            height={"2.5rem"}
            width={"2.5rem"}
            strokeWidth=".2rem"
          />
          <div className={styles.text}>
            <p>Drafts</p>
          </div>
        </NavLink>
        <NavLink to="/trash" className={styles.link}>
          <Trash
            stroke={"#212529"}
            fill="#F7F5EB"
            height={"2.5rem"}
            width={"2.5rem"}
            strokeWidth=".2rem"
          />
          <div className={styles.text}>
            <p>Trash</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
