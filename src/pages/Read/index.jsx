import React from "react";
import Header from "../../components/Header";
import BottomMenu from "@/components/BottomMenu";

import Styles from "./index.module.less";

import { getChapterData } from "@/servers/read.js";

import { joinParamUrl } from "@/utils/utils.js";

class Read extends React.Component {
  constructor(props) {
    super(props);
    // this.params = this.props.match.params;

    this.state = {
      picNumber: 0,
      title: "",
      cid: this.props.match.params.cid,
      chapter: parseInt(this.props.match.params.chapter),
    };

    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    this.getData({ cid: this.state.cid, chapter: this.state.chapter });
  }

  async getData(data) {
    const result = await getChapterData(data);
    console.log(result.data);
    this.setState({
      picNumber: result.data.data.picNumber,
    });

    // http://zinchon.com:337/comic_pic?cid=1090&chapter=1&picon=1
    //result为接收到的二进制流

    // let imgBase64 =
    //   "data:image/png;base64," +
    //   window.btoa(String.fromCharCode(...new Uint8Array(result.data)));
  }

  pageChange = (chapter) => {
    this.props.history.replace(`/read/${this.state.cid}/${chapter}`);

    this.setState({
      chapter,
    });
  };

  renderImg() {
    let arr = new Array(this.state.picNumber).fill(1);
    return arr.map((el, index) => {
      return (
        <img
          src={joinParamUrl(import.meta.env.VITE_API_URL + "/comic_pic", {
            cid: this.state.cid,
            chapter: this.state.chapter,
            picon: index + 1,
          })}
          alt=""
          key={index}
        />
      );
    });
  }

  render() {
    return (
      <div className={Styles.read}>
        <Header title={this.state.title} back={true} />
        <div className={Styles.list}>{this.renderImg()}</div>
        <BottomMenu
          handlePageChange={this.pageChange}
          current={this.state}
          setTitle={(value) => {
            this.setState({ title: value });
          }}
        />
      </div>
    );
  }
}

export default Read;
