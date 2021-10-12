import React from "react";
import { withRouter } from "react-router-dom";

import Styles from "./index.module.less";
import { RightOutline } from "antd-mobile-icons";

import img from "../../assets/272h.jpg";

const Card = function (props) {
  const { history, item } = props;

  function handleClick(e) {
    e.preventDefault();
    history.push({ pathname: `/detail/${item.cid}` });
  }

  return (
    <div className={Styles.card} onClick={handleClick}>
      <img src={img} alt="封面" />
      <div className={Styles.content}>
        <h3 className={Styles.title}>{item.cname}</h3>
        <div className={Styles.detail}>
          <div className={Styles.text}>松本智也</div>
          <div className={Styles.text}>
            <span className={Styles.tag}>热血</span>
          </div>
          <div className={Styles.text2}>
            <span>更新至第{item.ccpn || 0}话</span>
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
