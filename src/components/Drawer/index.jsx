import React from "react";

import Styles from "./index.module.less";

function Item(props) {
  return <div className={Styles.item}>{props.children}</div>;
}

const arr = new Array(20).fill(1);

function Drawer(props) {
  return (
    <div className={Styles.Drawer} onClick={props.fillClose}>
      <div className={Styles.content} onClick={(e) => e.stopPropagation()}>
        {arr.map((el, index) => {
          return <Item key={index}>第{index + 1}话</Item>;
        })}
      </div>
    </div>
  );
}

export default Drawer;
