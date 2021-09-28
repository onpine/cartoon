import React, { useState, createRef } from "react";

// import { Icon } from "antd-mobile";
import {
  LeftOutline,
  RightOutline,
  UpOutline,
  DownOutline,
} from "antd-mobile-icons";
import Drawer from "@/components/Drawer";

import Styles from "./index.module.less";

class BottomMenu extends React.Component {
  constructor(props) {
    super();

    this.state = {
      open: false,
    };
  }

  onOpenChange = () => {
    console.log("onOpenChange");
    this.setState({ open: !this.state.open });
    console.log(this.state.open);
  };

  handlePer = () => {
    console.log("handlePer");
  };

  handleNext = () => {
    console.log("handleNext");
  };

  render() {
    const sidebar = <div>hahah</div>;

    return (
      <div className={Styles.menu}>
        <div className={Styles.btn}>
          <button onClick={this.onOpenChange}>
            <div className={Styles.changePage}>
              <span>章节列表</span>
              {this.state.open ? <DownOutline /> : <UpOutline />}
            </div>
          </button>
          <button onClick={this.handleNext}>
            <div className={Styles.changePage}>
              <span>下一话</span>
              <RightOutline />
            </div>
          </button>
          <button onClick={this.handlePer}>
            <div className={Styles.changePage}>
              <LeftOutline />
              <span>上一话</span>
            </div>
          </button>
          <div className={Styles.text}>第一话</div>
        </div>
        <div className={Styles.list}>
          {this.state.open ? (
            <Drawer
              fillClose={() => {
                this.setState({ open: false });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default BottomMenu;
