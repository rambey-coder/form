import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

import dashboard from "./assets/dashboard.svg";
import create from "./assets/create.svg";
import track from "./assets/track.svg";
import calc from "./assets/calculate.svg";
import user from "./assets/user.svg"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Link to="/profile">
            <img src={dashboard} alt="dashboard" />
            <p>Dashboard</p>
          </Link>

          <div>
            <img src={create} alt="create" />
            <p>Create Order</p>
          </div>

          <Link to="/track-order">
            <img src={track} alt="dashboard" />
            <p>Track Order</p>
          </Link>

          <div>
            <img src={calc} alt="dashboard" />
            <p>Cost Calculator</p>
          </div>

          <Link to="/account">
            <img src={user} alt="dashboard" />
            <p>Account</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
