import React from "react";
import Header from "../../components/Header";
import BottomMenu from "@/components/BottomMenu";

import Styles from "./index.module.less";

import { getChapterData } from "@/servers/read.js";

import { joinParamUrl } from "@/utils/utils.js";

import img1 from "@/assets/0001.jpg";
import img2 from "@/assets/0002.jpg";
import img3 from "@/assets/0003.jpg";
import img4 from "@/assets/0004.jpg";
import img5 from "@/assets/0005.jpg";

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.params = { ...this.props.match.params };

    this.state = {
      picNumber: 0,
      title: "",
    };

    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    this.getData(this.params);
  }

  async getData(data) {
    const result = await getChapterData(data);
    console.log(result.data);
    this.setState({
      picNumber: result.data.data.picNumber,
      title: result.data.data.title,
    });

    // http://zinchon.com:337/comic_pic?cid=1090&chapter=1&picon=1
    //result为接收到的二进制流

    // let imgBase64 =
    //   "data:image/png;base64," +
    //   window.btoa(String.fromCharCode(...new Uint8Array(result.data)));
  }

  renderImg() {
    let arr = new Array(this.state.picNumber).fill(1);
    return arr.map((el, index) => {
      return (
        <img
          src={joinParamUrl(import.meta.env.VITE_API_URL + "/comic_pic", {
            ...this.params,
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
        <BottomMenu />
      </div>
    );
  }
}

export default Read;
