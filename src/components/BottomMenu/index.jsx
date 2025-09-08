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
    // 注意：this.props.current.chapter指的是在lists的索引，传递路径：Detail->Read->BottomMenu->Drawer
    super(props);

    this.state = {
      open: false,
      lists: [],
      title: "",
      bottomTitle: "",
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
    this.setBottomTitleBychapter(this.props.current.chapter);
    this.props.setTitle(result.data.data.title);
  }

  onOpenChange = () => {
    console.log("onOpenChange");
    this.setState({ open: !this.state.open });
    // console.log(this.state.open);
  };

  onPageChange = (chapter) => {
    this.props.handlePageChange(chapter);
    this.setBottomTitleBychapter(chapter);
  };

  handlePer = () => {
    console.log("handlePer");
    const chapter = this.props.current.chapter - 1;
    this.onPageChange(chapter);
    this.setBottomTitleBychapter(chapter);
  };

  handleNext = () => {
    console.log("handleNext");
    const chapter = this.props.current.chapter + 1;
    this.onPageChange(this.props.current.chapter + 1);
    this.setBottomTitleBychapter(chapter);
  };

  setBottomTitleBychapter = (chapter) => {
    const item = this.state.lists?.[chapter];
    this.state.bottomTitle = item?.ctitle;
  };

  backTop = () => {
    const imgBox = document.getElementById("imgBox");
    imgBox.scroll({
      top: 0,
      left: this.props.current.readDirection == 3 ? imgBox.scrollWidth : 0,
      behavior: "smooth",
    });
  };

  render() {
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
            {this.state.bottomTitle}
          </div>
        </div>
        <div
          className={Styles.list}
          // style={{ display: this.state.open ? "block" : "none" }}
        >
          {this.state.open ? (
            <Drawer
              fillClose={() => {
                this.setState({ open: false });
              }}
              pageChange={(index) => {
                this.onPageChange(index);
              }}
              lists={this.state.lists}
              currentNum={this.props.current.chapter}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default BottomMenu;
