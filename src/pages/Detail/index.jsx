import React from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "antd-mobile";
import Header from "../../components/Header";

import Styles from "./index.module.less";

import img from "../../assets/360h.jpg";

const Detail = function (props) {
  const aid = props.match.params.id;
  console.log(aid);

  const data = Array.from(new Array(9)).map((_val, i) => ({
    text: `name${i}`,
  }));

  function renderItem(el, index) {
    return (
      <button className={Styles.item} onClick={() => handleClick(index + 1)}>
        第{index + 1}话
      </button>
    );
  }

  function handleClick(index) {
    props.history.push({ pathname: `/read/${index}` });
  }

  return (
    <div>
      <Header title="春娇与志明" back={true} />
      <div className={Styles.detail}>
        <img src={img} alt="封面" />
        <div className={Styles.tags}>
          <span className={Styles.tag}>春娇</span>
          <span className={Styles.tag}>志明</span>
          <span className={Styles.tag}>爱情</span>
        </div>
        <div className={Styles.all}>
          <div className={Styles.topWrap}>
            <div className={Styles.left}>全部章节(45)</div>
          </div>
          <Grid columns={4} gap={8}>
            {data.map((el, index) => {
              return <Grid.Item key={index}>{renderItem(el, index)}</Grid.Item>;
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Detail);
