import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Button, Space } from "antd-mobile";
import { DownOutline, UpOutline } from "antd-mobile-icons";
import Header from "../../components/Header";

import Styles from "./index.module.less";

import { getDetail } from "@/servers/detail.js";

import img from "../../assets/360h.jpg";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.cid = props.match.params.cid;
    this.state = {
      lists: [],
      title: "",
      // true:升序
      sortType: true,
    };
    /**
     * Array.from(new Array(9)).map((_val, i) => ({
        text: `name${i}`,
      })),
     */

    this.getDetail = this.getDetail.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getDetail();
  }

  async getDetail() {
    const result = await getDetail({ cid: this.cid });
    console.log(result);
    this.setState({
      lists: [...result.data.data.chapters],
      title: result.data.data.title,
    });
  }

  renderItem(el, index) {
    return (
      <button
        className={Styles.item}
        onClick={() => this.handleClick(index + 1)}
      >
        {el}
      </button>
    );
  }

  handleClick(index) {
    this.props.history.push({ pathname: `/read/${this.cid}/${index}` });
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} back={true} />
        <div className={Styles.detail}>
          <img src={img} alt="封面" />
          <div className={Styles.tags}>
            <span className={Styles.tag}>春娇</span>
            <span className={Styles.tag}>志明</span>
            <span className={Styles.tag}>爱情</span>
          </div>
          <div className={Styles.all}>
            <div className={Styles.topWrap}>
              <div className={Styles.left}>
                全部章节({this.state.lists.length})
              </div>
              <div className={Styles.right}>
                <Button
                  size="mini"
                  fill="none"
                  onClick={() => {
                    this.setState({ sortType: !this.state.sortType });
                  }}
                >
                  <Space>
                    <span>{this.state.sortType ? "升序" : "降序"}</span>
                    {this.state.sortType ? <DownOutline /> : <UpOutline />}
                  </Space>
                </Button>
              </div>
            </div>
            <Grid columns={2} gap={8}>
              {(this.state.sortType
                ? this.state.lists
                : this.state.lists.reverse()
              ).map((el, index) => {
                return (
                  <Grid.Item key={index}>
                    {this.renderItem(el, index)}
                  </Grid.Item>
                );
              })}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
