import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useState } from "react";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import Sidebar from "./component/Sidebar";
import styles from "./Contact.module.scss";

function Contact() {
  TabTitle("Contact");
  const cx = classNames.bind(styles);
  const [search, setSearch] = useState();

  return (
    <>
        <Header search={search} onChange={(e) => setSearch(e.target.value)} />

      <div className={cx("wrap")}>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <Sidebar />
        </div>
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className="page-wrapper">
            <div className="heading-page">
              <h1>Giới thiệu</h1>
            </div>
            <div className="wrapbox-content-page">
              <div className="content-page ">
                <div className="info">
                  <FontAwesomeIcon
                    icon={faStarAndCrescent}
                    style={{ fontSize: "1.6rem" }}
                  />
                  <br />
                  <h1> THÔNG TIN HỆ THỐNG CỬA HÀNG DIRTYCOINS</h1>
                  <br />
                  <h2>HỆ THỐNG CỬA HÀNG</h2>
                  <br />
                  <div className={cx("footer-content-title")}>
                    <h3>Chi Nhánh Hồ Chí Minh</h3>
                    <br />
                    <br />
                    <ul>
                      <li className={cx("footer-content-item")}>
                        - Quận 10 - 561 Sư Vạn Hạnh, Phường 13.
                      </li>
                      <li className={cx("footer-content-item")}>
                        - Quận Tân Bình - 136 Nguyễn Hồng Đào, Phường 14. Quận 1
                      </li>

                      <li className={cx("footer-content-item")}>
                        - Central Market 4 Phạm Ngũ Lão, Phường Phạm Ngũ Lão.
                      </li>
                      <li className={cx("footer-content-item")}>
                        - Quận Gò Vấp - 41 Quang Trung, Phường 3.
                      </li>
                    </ul>
                  </div>
                  <div className={cx("footer-content ")}>
                    <ul>
                      <li className={cx("footer-contact contact-1")}>TP.HCM</li>
                      <li className={cx("footer-contact contact-2")}>
                        0343803696
                      </li>
                      <li className={cx("footer-contact contact-3")}>
                        coming soon
                      </li>
                      <li className={cx("footer-contact contact-4")}>
                        outerity.local@gmail.com
                      </li>
                    </ul>
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
export default Contact;
