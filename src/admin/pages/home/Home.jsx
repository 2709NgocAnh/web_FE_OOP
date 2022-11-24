import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Widget from "~/admin/component/widget/Widget";
const cx = classNames.bind(styles)
const Home = () => {
  return (
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
  );
};

export default Home;
