import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Widget from "~/admin/component/widget/Widget";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
const cx = classNames.bind(styles);
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
              <div style={{padding:"20px",display:"flex",justifyContent:"space-between"}}>
                <iframe
                  title="chart"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                    width: "650px",
                    height: "400px",
                  }}
                  src="https://charts.mongodb.com/charts-project-0-bayyh/embed/charts?id=6392e3b6-e777-46d3-8ff5-0c5b68b32852&maxDataAge=3600&theme=light&autoRefresh=true"
                ></iframe>
                <iframe title="chart 2" style={{background: "#FFFFFF",border:"none",borderRadius: "2px",boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)", width:"400px", height:"400px"}} src="https://charts.mongodb.com/charts-project-0-bayyh/embed/charts?id=6392f0bb-d836-40f6-8ee6-609d853e7c20&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
