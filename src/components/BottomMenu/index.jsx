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

import { getDetail } from "@/servers/detail.js";

class BottomMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      lists: [],
      title: "",
    };

    this.getDetailData = this.getDetailData.bind(this);
  }

  componentDidMount() {
    this.getDetailData();

    // window.addEventListener("scroll", (e) => {
    //   console.log(e);
    // });
  }

  async getDetailData() {
    const result = await getDetail({ cid: this.props.current.cid });
    console.log(result);
    this.setState({
      lists: [...result.data.data.chapters],
      title: result.data.data.title,
    });

    this.props.setTitle(result.data.data.title);
  }

  onOpenChange = () => {
    console.log("onOpenChange");
    this.setState({ open: !this.state.open });
    console.log(this.state.open);
  };

  handlePer = () => {
    console.log("handlePer");
    this.props.handlePageChange(this.props.current.chapter - 1);
  };

  handleNext = () => {
    console.log("handleNext");
    this.props.handlePageChange(this.props.current.chapter + 1);
  };

  backTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
          <div className={Styles.text} onClick={() => this.backTop()}>
            {this.state.lists[this.props.current.chapter - 1]}
          </div>
        </div>
        <div
          className={Styles.list}
          style={{ display: this.state.open ? "block" : "none" }}
        >
          {
            <Drawer
              fillClose={() => {
                this.setState({ open: false });
              }}
              pageChange={(index) => {
                this.props.handlePageChange(index + 1);
              }}
              lists={this.state.lists}
              currentNum={this.props.current.chapter - 1}
            />
          }
        </div>
      </div>
    );
  }
}

export default BottomMenu;
