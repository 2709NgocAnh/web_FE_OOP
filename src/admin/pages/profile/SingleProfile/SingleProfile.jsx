import styles from "./SingleProfile.module.scss";
import { useState,useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import * as registerService from "~/admin/services/registerService"; 

function SingleProfile() {
  const cx = classNames.bind(styles);
  const [auth, setAuth] = useState([]);

  const fetchApi = async () => {
    const response = await registerService.getRegister();
    setAuth(response.account);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div className={cx("single")}>
      <div className={cx("singleContainer")}>
        <div className={cx("top")}>
          <div className={cx("left")}>
            <Link to={`/admin/profile/editprofile`} className={cx("editButton")}>
              <div className={cx("viewButton")}>Edit</div>
            </Link>
           
            <h1 className={cx("title")}>Thông tin cá nhân</h1>
            <div className={cx("item")}>
              <div
                className={cx("itemImg")}
              >
               <p>{auth.fullName?.split(" ").pop().slice(0, 1)}  </p> 
                </div>
              <div className={cx("details")}>
                <h1 className={cx("itemTitle")}>{auth.fullName}</h1>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Email:</span>
                  <span className={cx("itemValue")}>{auth.email}</span>
                </div>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Phone:</span>
                  <span className={cx("itemValue")}>{auth.phoneNumber}</span>
                </div>
                <div className={cx("detailItem")}>
                  <span className={cx("itemKey")}>Address:</span>
                  <span className={cx("itemValue")}>
                  {auth.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProfile;
