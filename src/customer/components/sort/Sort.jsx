import classNames from "classnames/bind";
import styles from "./Sort.module.scss";

import { CaretDownOutlined } from "@ant-design/icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function Sort(props) {
  const { setNameSort, setValueSort,nameSort,valueSort} = props;
  const [isSortPrice, setIsSortPrice] = useState(false);
  const [isSortName, setIsSortName] = useState(false);

  return (
    <div className={cx("container")}>
        
      <div className={cx("box")}>
        <p> Lọc Giá </p>
        <CaretDownOutlined onClick={() =>(setIsSortPrice(!isSortPrice),setIsSortName(false))}/>
      </div>
      {isSortPrice === true ? (
        <div className={cx("dropdown")}>
          <div className={cx("dropdown__item")}>
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="1"
              onClick={(e) => {
                e.preventDefault();
                setNameSort("price");
                setValueSort(1);
                setIsSortPrice(false);
              }}
              checked={(nameSort==="price"&&valueSort===1)?true:false}
            />
            <label for="html">Gía: Tăng dần</label>
          </div>
          <div className={cx("dropdown__item")}>
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="-1"
              onClick={(e) => {
                e.preventDefault();
                setNameSort("price");
                setValueSort(-1);
                setIsSortPrice(false);
              }}
              checked={(nameSort==="price"&&valueSort===-1)?true:false}

            />
            <label for="css">Giá: Giảm dần</label>
          </div>
         
        </div>
      ) : (
        ""
      )}
       <div className={cx("box")}>
        <p>Name </p>
        <CaretDownOutlined onClick={() => (setIsSortName(!isSortName),setIsSortPrice(false))} />
      </div>
      {isSortName === true ? (
        <div className={cx("dropdown__name")}>
          
          <div className={cx("dropdown__name__item")}>
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="1"
              onClick={(e) => (
                setNameSort("name"), setValueSort(1), setIsSortName(false)
              )}
              checked={(nameSort==="name"&&valueSort===1)?true:false}

            />
            <label for="css">Tên: A-Z</label>
          </div>
          <div className={cx("dropdown__name__item")}>
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="-1"
              onClick={(e) => (
                setNameSort("name"), setValueSort(-1), setIsSortName(false)
              )}
              checked={(nameSort==="name"&&valueSort===-1)?true:false}

            />
            <label for="css">Tên:Z-A</label>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

Sort.propTypes = {};

export default Sort;
