import React, { Component } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";

import Styles from "./index.module.less";

import { getHomeSearch } from "@/servers/home.js";
// import { Search } from "antd-mobile";
import { LeftOutline, FrownOutline } from "antd-mobile-icons";

class MySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      keyWord: decodeURI(this.props.location.search.split("=")[1] || ""),
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    if (this.state.keyWord) this.getData(this.state.keyWord);
    // console.log(import.meta.env.VITE_API_URL);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.location.search != this.props.location.search &&
      this.props.location.search.split("=")[1]
    ) {
      // console.log("key=", this.props.location.search.split("=")[1]);
      // console.log("key2=", prevProps.location.search.split("=")[1]);
      this.setState({
        keyWord: decodeURI(this.props.location.search.split("=")[1]),
      });
      this.getData(decodeURI(this.props.location.search.split("=")[1]));
    }
  }

  async getData(keyWord) {
    const result = await getHomeSearch(keyWord);
    console.log(result);
    this.setState({
      lists: [...result.data.data],
    });
  }
  handleGoSearch = () => {
    if (!this.state.keyWord) {
      return;
    }
    this.props.history.push({
      pathname: "/search",
      search: "key=" + this.state.keyWord,
    });
  };

  render() {
    return (
      <div className={Styles.search}>
        <div className={Styles.inputBox}>
          <div className={Styles.left}>
            {
              <LeftOutline
                onClick={() => {
                  this.props.history.go(-1);
                }}
                fontSize={18}
              />
            }
          </div>
          <div className={Styles.center}>
            <input
              type="text"
              value={this.state.keyWord}
              onChange={(e) => {
                this.setState({ keyWord: e.target.value });
              }}
              onKeyDown={(event) => {
                if (event.keyCode == 13) {
                  this.handleGoSearch();
                }
              }}
            />
          </div>
          <div className={Styles.right} onClick={this.handleGoSearch}>
            搜索
          </div>
        </div>
        <div>
          {(() => {
            if (this.state.lists.length == 0) {
              return (
                <div className={Styles.result}>
                  <FrownOutline fontSize={50} />
                  <div>搜索结果为空</div>
                </div>
              );
            } else {
              return this.state.lists.map((el, index) => {
                return <Card item={el} key={el.cid} />;
              });
            }
          })()}
        </div>
      </div>
    );
  }
}

export default MySearch;
