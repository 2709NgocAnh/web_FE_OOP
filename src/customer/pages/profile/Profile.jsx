import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import * as registerService from "~/admin/services/registerService";
import SideBar from "../vieworder/component/sidebar/SideBar";
import Header from "~/customer/Layout/components/header/Header";

function Profile() {
  TabTitle("Tài khoản của tôi");
  const cx = classNames.bind(styles);
  const [profile, setProfile] = useState();
  const [search, setSearch] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await registerService.getRegister();
      setProfile(response.account);
    };
    fetchApi();
  }, []);
  return (
    <>
      <Header search={search} onChange={(e) => setSearch(e.target.value)} />

      <div className={cx("wrap")}>
        <SideBar />
        <div className="col-md-10 col-sm-12 col-xs-12">
          <div className={cx("single")}>
            <div className={cx("singleContainer")}>
              <div className={cx("top")}>
                <div className={cx("left")}>
                  <div className={cx("item")}>
                    <NavLink
                      className={(nav) => cx({ active: nav.isActive })}
                      to={`/profile/editprofile`}
                    >
                      <div className={cx("editButton")}>Edit</div>
                    </NavLink>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className={cx("user-avatar--work")}>
                        {profile?.fullName.split(" ").pop().slice(0, 1)} 
                      </div>
                    </div>
                    <div className={cx("details")}>
                      <h1 className={cx("itemTitle")}>{profile?.fullName}</h1>
                      <div className={cx("detailItem")}>
                        <span className={cx("itemKey")}>Email:</span>
                        <span className={cx("itemValue")}>
                          {profile?.email}
                        </span>
                      </div>
                      <div className={cx("detailItem")}>
                        <span className={cx("itemKey")}>Phone:</span>
                        <span className={cx("itemValue")}>
                          {profile?.phoneNumber}
                        </span>
                      </div>
                      <div className={cx("detailItem")}>
                        <span className={cx("itemKey")}>Address:</span>
                        <span className={cx("itemValue")}>
                          {profile?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
