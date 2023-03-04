import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./TrackOrder.module.css";

import add from "./assets/add.svg";
import search from "./assets/search.svg";

const TrackOrder = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.order}>
          <div className={styles.head}>
            <h2>Orders</h2>
            <button>
              <img src={add} alt="add" />
              Create Order
            </button>
          </div>
          <div className={styles.filter}>
            <div>
              <input type="text" />
              <img src={search} alt="search" />
            </div>
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">All</option>
              <option value="">Pending</option>
              <option value="">Successful</option>
              <option value="">Cancelled</option>
            </select>
          </div>
        </div>

        <div className={styles.history}>
          <h5>Order History</h5>

          <div className={styles.userlist_container}>
            <div className={styles.users}>
              <div className={styles.header_list}>
                <div>Order ID</div>
                <div>Status</div>
                <div>Delivery Status</div>
                {/* <div>Transcriptions</div> */}
                <div>Date</div>
              </div>
              <hr />
              <div className={styles.user_list}>
                <div className={styles.agent_name}>
                  <p>Clara David</p>
                </div>
                <div className={styles.company_name}>BrainBox</div>
                <div className={styles.status}>Active</div>
                {/* <div className={styles.transcriptions}>40</div> */}
                <div className={styles.date}>16 Nov 2022, 11: 30am</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
