import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import * as sliderService from "~/admin/services/sliderService";

function Slider(props) {
  const cx = classNames.bind(styles);
  const [slideList, setSlideList] = useState([]);
  //call API
  const fetchApi = async () => {
    const response = await sliderService.getSlider();
    setSlideList(response.sliders);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div
        id="carouselExampleControls"
        className={cx("carousel slide")}
        data-bs-ride="carousel"
        style={{ width: "100%" }}
      >
        <div className={cx("carousel-inner")}>
          {slideList.map((slider, index) => {
            return (
              <div
                className={cx(
                  index === 1 ? "carousel-item active" : "carousel-item"
                )}
                key={slider._id}
              >
                <Image
                  width="1620px"
                  height="500px"
                  className={cx("d-block w-100")}
                  cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                  publicId={slider.image}
                />
              </div>
            );
          })}

          <button
            className={cx("carousel-control-prev btn1")}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            style={{ width: "auto", paddingLeft: 25 }}
          >
            <span
              className={cx("carousel-control-prev-icon")}
              aria-hidden="true"
            />
            <span className={cx("visually-hidden")}>Previous</span>
          </button>
          <button
            className={cx("carousel-control-next btn1")}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            style={{ width: "auto", paddingRight: 35 }}
          >
            <span
              className={cx("carousel-control-next-icon")}
              aria-hidden="true"
            />
            <span className={cx("visually-hidden")}>Next</span>
          </button>
          <div className={cx("title")}>{props.title}</div>
        </div>
      </div>
    </>
  );
}
export default Slider;
