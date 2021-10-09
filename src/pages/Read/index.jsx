import React from "react";
import Header from "../../components/Header";
import BottomMenu from "@/components/BottomMenu";

import Styles from "./index.module.less";

import { getChapterData } from "@/servers/read.js";

import img1 from "@/assets/0001.jpg";
import img2 from "@/assets/0002.jpg";
import img3 from "@/assets/0003.jpg";
import img4 from "@/assets/0004.jpg";
import img5 from "@/assets/0005.jpg";

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.params = { ...this.props.match.params };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const result = await getChapterData(this.params);
    console.log(result.data);
    //result为接收到的二进制流

    // let imgBase64 =
    //   "data:image/png;base64," +
    //   window.btoa(String.fromCharCode(...new Uint8Array(result.data)));
  }

  render() {
    return (
      <div className={Styles.read}>
        <Header
          title={`春娇与志明-第${this.props.match.params.id}话`}
          back={true}
        />
        <div className={Styles.list}>
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
          <img src={img5} alt="" />
        </div>
        <BottomMenu />
      </div>
    );
  }
}

export default Read;
