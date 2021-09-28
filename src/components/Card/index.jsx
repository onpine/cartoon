import React from "react";
import { withRouter } from "react-router-dom";

import Styles from "./index.module.less";
import { RightOutline } from "antd-mobile-icons";

import img from "../../assets/272h.jpg";

const Card = function (props) {
  const { history } = props;

  function handleClick(e) {
    e.preventDefault();
    history.push({ pathname: "/detail/12345" });
  }

  return (
    <div className={Styles.card}>
      <img src={img} alt="封面" />
      <div className={Styles.content}>
        <h3 className={Styles.title}>春娇与志明</h3>
        <div className={Styles.detail}>
          <div className={Styles.text}>松本智也</div>
          <div className={Styles.text}>
            <span className={Styles.tag}>热血</span>
          </div>
          <div className={Styles.text2}>
            <span>更新至第45话</span>
            <a onClick={handleClick}>
              查看
              <RightOutline />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
