import React from "react";

import Styles from "./index.module.less";

const arr = new Array(20).fill(1);

function Drawer(props) {
  function handleSelect(index) {
    // console.log(props);
    props.fillClose();
  }

  return (
    <div className={Styles.Drawer} onClick={props.fillClose}>
      <div className={Styles.content} onClick={(e) => e.stopPropagation()}>
        {arr.map((el, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={Styles.item}
            >
              第{index + 1}话
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Drawer;
