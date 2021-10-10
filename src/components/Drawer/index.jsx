// import { style } from "dom-helpers";
import React from "react";

import Styles from "./index.module.less";

const arr = new Array(20).fill(1);

function Drawer(props) {
  function handleSelect(index) {
    // console.log(props);
    props.fillClose();
    props.pageChange(index);
  }

  return (
    <div className={Styles.Drawer} onClick={props.fillClose}>
      <div className={Styles.content} onClick={(e) => e.stopPropagation()}>
        {props.lists.map((el, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={
                index == props.currentNum ? Styles.active : Styles.item
              }
            >
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Drawer;
