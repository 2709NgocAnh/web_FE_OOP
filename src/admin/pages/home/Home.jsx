import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Widget from "~/admin/component/widget/Widget";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
const cx = classNames.bind(styles)
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          <div className={cx("home")}>
            <div className={cx("homeContainer")}>
              <div className={cx("widgets")}>
                <Widget type="user" />
                <Widget type="category" />
                <Widget type="product" />
                <Widget type="order" />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
