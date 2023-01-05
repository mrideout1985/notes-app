import { useNavigate } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

import { logout } from "../../api/services/services";
import { BookOpen } from "../icons";
import SvgUser from "../icons/User";
import styles from "./TopNavbar.module.scss";

interface TopNavbar {
  sideBarOpen: () => void;
}

const TopNavBar = ({ sideBarOpen }: TopNavbar) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token"); // temporary until i fix the store
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Navbar dark className={styles.navbar}>
      <>
        <NavbarToggler
          tag="button"
          className={styles.sidebartoggler}
          aria-label="Toggle sidebar"
          onClick={sideBarOpen}
        />
        <NavbarBrand className={styles.brand} href="/">
          <i>N</i>otes <BookOpen />
        </NavbarBrand>
        <UncontrolledDropdown
          aria-hidden={user ? false : true}
          aria-label="user options dropdown"
          className={styles.dropdown}
        >
          <DropdownToggle className={styles.dropdowntoggle}>
            <SvgUser height="3rem" width="3rem" />
          </DropdownToggle>
          {user && (
            <DropdownMenu className={styles.dropdownmenu}>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
              </>
            </DropdownMenu>
          )}
        </UncontrolledDropdown>
      </>
    </Navbar>
  );
};

export default TopNavBar;
