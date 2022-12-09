import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import * as registerService from "~/admin/services/registerService";
import * as feedbackService from "~/admin/services/feedbackService";

import TabTitle from "~/components/tabtiltle/TabTiltle";
import Header from "~/customer/Layout/components/header/Header";
import Sidebar from "./component/Sidebar";
import styles from "./FeedBack.module.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function FeedBack() {
  TabTitle("Star Rate");
  const userRef = useRef();
  const cx = classNames.bind(styles);
  const [email, setEmail] = useState();
  const [content, setContent] = useState("");
  const [err, setErr] = useState("");
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const navigate = useNavigate();

  const fetchApi = async () => {
    const response = await registerService.getRegister();
    setEmail(response.account.email);
  };

  useEffect(() => {
    Cookies.get("accessToken")?fetchApi():(Swal.fire("Vui lòng đăng nhập trước khi đánh giá đơn hàng") && navigate("/sign-in"));
  }, []);
  
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (content === "" && focused) {
      setErr("Hãy nhập ý kiến của bạn");
    } else {
      setErr("");
    }
  }, [content, focused]);

  const stars = Array(5).fill(0);
  const handleFocus = (e) => {
    setFocused(true);
  };
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchApi = async () => {
       await feedbackService.addFeedBack(content,currentValue);
       setCurrentValue("")
       setContent("")
      };
    fetchApi();
    setFocused(false)
  };
  return (
    <>
     <Header />

      <div className={cx("wrap")}>
        <div className="col-md-3 col-sm-12 col-xs-12">
          <Sidebar />
        </div>
        <div className="col-md-9 col-sm-12 col-xs-12">
          <div className="page-wrapper">
            <div className={cx("container__wrapper")}>
              <h1 className={cx("wrapper-title")}>Ý kiến khách hàng </h1>
              <div className={cx("stars")}>
                {stars.map((_, index) => {
                  return (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={index}
                      size={24}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={
                        (hoverValue || currentValue) > index
                          ? colors.orange
                          : colors.grey
                      }
                      style={{
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                  );
                })}
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  placeholder="Email của bạn"
                  className={cx("wrapper-input")}
                  type="email"
                  ref={userRef}
                  autoComplete="off"
                  disabled="true"
                  value={email}
                  pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
                  onBlur={handleFocus}
                  required="true"
                />
                <textarea
                  placeholder="Ý kiến của bạn"
                  className={cx("wrapper-text")}
                  pattern="\S+.*"
                  onBlur={handleFocus}
                  value={content}
                  required="true"
                  onChange={(event) => {
                    setContent(event.target.value);
                    setFocused(true);
                  }}
                />
                <span className={cx("wrapper-text-err")}>{err}</span>
                <button className={cx("wrapper-btn")}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedBack;
