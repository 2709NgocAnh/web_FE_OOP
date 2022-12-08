import classNames from "classnames/bind";
import { useState } from "react";
import BarChart from "~/admin/component/barchart/BarChart";
import Widget from "~/admin/component/widget/Widget";
import Navbar from "~/admin/Layout/components/Navbar/Navbar";
import Sidebar from "~/admin/Layout/components/Sidebar/Sidebar";
import styles from "./Home.module.scss";
import Chart from "chart.js/auto";
import PieChart from "~/admin/component/piechart/PieChart";
import { useEffect } from "react";
import * as categoryService from "~/admin/services/categoryService";

const cx = classNames.bind(styles);

const Home = () => {
  //   const UserData = [
  //     {
  //       id: 0,
  //       year: 2016,
  //       userGain: 80000,
  //       userLost: 823,
  //     },
  //     {
  //       id: 1,
  //       year: 2017,
  //       userGain: 45677,
  //       userLost: 345,
  //     },
  //     {
  //       id: 2,
  //       year: 2018,
  //       userGain: 78888,
  //       userLost: 555,
  //     },
  //     {
  //       id: 3,
  //       year: 2019,
  //       userGain: 90000,
  //       userLost: 4555,
  //     },
  //     {
  //       id: 4,
  //       year: 2020,
  //       userGain: 4300,
  //       userLost: 234,
  //     },
  //   ];
  const [userData, setUserData] = useState([])
  
  useEffect(() => {
    const fetchApi = async () => {
      const response = await categoryService.getCategory();
      setUserData(response.categories);
    };
    fetchApi();
  }, []);

  const data=({
    labels: userData.map((data) => data.name),
    datasets: [
      {
        label: "Users Gained",
        data: userData.map((data) => data.name),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

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
