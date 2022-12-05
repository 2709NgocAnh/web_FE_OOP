import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./SearchProduct.module.scss";
const cx = classNames.bind(styles);

function Search(props) {
  const { setValueSearch, valueSearch,handleSubmit} = props;

  return (
    <div>
      <form  onSubmit={handleSubmit} >
      <div className={cx("search")}>
        <input
          type="text"
          placeholder="Tim kiem..."
          className={cx("search")}
          onChange={(e) => setValueSearch(e.target.value)}
          value={valueSearch}
        />
        <button className={cx("search-btn")} type="submit">
          <SearchOutlined />
        </button>
      </div>
      </form>
    </div>
  );
}

Search.propTypes = {};

export default Search;
