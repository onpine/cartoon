import React from "react";
import PropTypes from "prop-types";
import { NavBar } from "antd-mobile";
import { LeftOutline, SearchOutline } from "antd-mobile-icons";

import Styles from "./index.module.less";

import { useHistory } from "react-router-dom";

const Header = function (props) {
  const history = new useHistory();
  const { title, back } = props;

  return (
    <div className={Styles.header}>
      <NavBar
        mode="light"
        backArrow={back}
        icon={back ? <LeftOutline /> : ""}
        onBack={() => history.go(-1)}
        right={<SearchOutline fontSize={18} />}
      >
        {title}
      </NavBar>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
};

Header.defaultProps = {
  back: false,
};

export default Header;
