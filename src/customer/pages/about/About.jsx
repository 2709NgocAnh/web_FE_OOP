import classNames from "classnames/bind";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import styles from "./About.module.scss";
import LinkAbout from "./component/linkabout/LinkAbout";
function About() {
  const cx = classNames.bind(styles);
  TabTitle("About");
  return (
    <div className={cx("About")}>
        <Header />
      <div className={cx("wrapper-row pd-page")}>
        <div className={cx("container-fluid")}>
          <div className={cx("row")}>
            <div className={cx("col-md-3 col-sm-12 col-xs-12")}>
              <LinkAbout/>
            </div>
            <div className={cx("col-md-9 col-sm-12 col-xs-12")}>
              <div className={cx("page-wrapper")}>
                <div className={cx("heading-page")}>
                  <h1>Giới thiệu</h1>
                </div>
                <div className={cx("wrapbox-content-page")}>
                  <div className={cx("content-page ")}>
                    <p>
                      Chúng mình xuất hiện để đem tới mọi người một chất lượng
                      áo tốt nhất, với giá thành hấp dẫn nhất để đưa Outerity
                      đến với tất cả lứa tuổi và khắp mọi vùng miền đất nước
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
