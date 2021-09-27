import React from "react";
import PropTypes from "prop-types";
import { NavBar, Icon } from "antd-mobile";

import Styles from "./index.module.less";

import { useHistory } from "react-router-dom";

const Header = function (props) {
  // console.log(props)
  const history = new useHistory();
  const { title, back } = props;

  return (
    <div className={Styles.header}>
      <NavBar
        mode="light"
        icon={<Icon type={back ? "left" : ""} />}
        onLeftClick={() => history.go(-1)}
        rightContent={[<Icon key="1" type="search" />]}
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
