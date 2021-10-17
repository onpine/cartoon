import React, { useState } from "react";

import { DownOutline } from "antd-mobile-icons";

import Styles from "./index.module.less";

function ReadSetting(props) {
  const [state, setState] = useState({
    readDirection: props.data.readDirection,
  });

  const handleDisectionChange = (value) => {
    setState({
      readDirection: value,
    });
    props.change({ readDirection: value });
    // console.log(document.getElementById("imgBox").scrollWidth);
  };

  return (
    <div className={Styles.readSetting}>
      <div className={Styles.header}>
        <DownOutline
          fontSize="20"
          onClick={() => {
            props.change({ popupVisible: false });
          }}
        />
      </div>
      <div className={Styles.title}>阅读方向</div>
      <div className={Styles.readingDirection}>
        <button
          className={
            state.readDirection == 1 ? Styles["button-active"] : undefined
          }
          onClick={() => handleDisectionChange(1)}
        >
          从上到下
        </button>
        <button
          className={
            state.readDirection == 2 ? Styles["button-active"] : undefined
          }
          onClick={() => handleDisectionChange(2)}
        >
          从左到右
        </button>
        <button
          className={
            state.readDirection == 3 ? Styles["button-active"] : undefined
          }
          onClick={() => handleDisectionChange(3)}
        >
          从右到左
        </button>
      </div>
    </div>
  );
}

export default ReadSetting;
