import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Action from "./component/action/Action";
import Logo from "./component/logo/Logo";
import Menu from "./component/menu/Menu";
import Search from "./component/search/Search";

const cx = classNames.bind(styles);
function Header(props) {
  const { setValueSearch, valueSearch,handleSubmit,setIdCategory} = props;

    
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Logo />
        <Menu setIdCategory={setIdCategory}/>
        <Search setValueSearch={setValueSearch} valueSearch={valueSearch} handleSubmit={handleSubmit} />
        <Action />
      </div>
    </header>
  );
}

export default Header;
