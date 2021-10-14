// import { style } from "dom-helpers";
import React, { useEffect } from "react";

import Styles from "./index.module.less";

const arr = new Array(20).fill(1);

function Drawer(props) {
  function handleSelect(index) {
    // console.log(props);
    props.fillClose();
    // autoScrollTop();
    props.pageChange(index);
  }

  useEffect(() => {
    autoScrollTop();
  }, [props.currentNum]);

  const autoScrollTop = () => {
    // console.log(props.currentNum * 40);
    document.getElementById("drawerContent").scroll({
      top: (props.currentNum - 7) * 40,
      // behavior: "smooth",
    });
  };

  return (
    <div className={Styles.Drawer} onClick={props.fillClose}>
      <div
        className={Styles.content}
        onClick={(e) => e.stopPropagation()}
        id="drawerContent"
      >
        {props.lists.map((el, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={
                index == props.currentNum ? Styles.active : Styles.item
              }
            >
              {el.ctitle}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Drawer;
