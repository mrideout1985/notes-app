import { useState } from "react";
import { Outlet } from "react-router-dom";

import TopNavBar from "../navbar/TopNavbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";

const Layout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <TopNavBar sideBarOpen={handleSideBar} />
      <div className={styles.layout}>
        <main className={styles.main}>
          <Sidebar open={sideBarOpen} />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
