import React from "react";
import Header from "../../components/Header";
import BottomMenu from "@/components/BottomMenu";
import ReadSetting from "./components/ReadSetting";
import { AppstoreOutline } from "antd-mobile-icons";
import { Popup } from "antd-mobile";

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
      // 1:从上到下，2:从左到右，3:从右到左
      readDirection: 1,
      // 弹出层显示
      popupVisible: false,
    };

    this.renderImg = this.renderImg.bind(this);
  }

  componentDidMount() {
    this.getData({ cid: this.state.cid, chapter: this.state.chapter });
  }

  componentDidUpdate(prevProps, prevState) {
    const routerChapter = parseInt(this.props.match.params.chapter);
    if (this.state.chapter !== routerChapter) {
      this.setState({
        chapter: routerChapter,
      });
      this.getData({
        cid: this.state.cid,
        chapter: routerChapter,
      });
    }
    // setTimeout(() => {
    //   this.backStartScroll();
    // }, 0);
  }

  backStartScroll = () => {
    const imgBox = document.getElementById("imgBox");
    if (this.state.readDirection == 3) {
      imgBox.scroll({
        left: imgBox.scrollWidth,
      });
    } else if (this.state.readDirection == 2) {
      imgBox.scroll({
        left: 0,
      });
    }
  };

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
    if (chapter == this.state.chapter) return;
    this.setState({
      picNumber: 0,
    });
    this.props.history.replace(`/read/${this.state.cid}/${chapter}`);
  };

  renderImg(picNumber) {
    let arr = new Array(picNumber).fill(1);
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
        <div
          className={Styles.list}
          style={{ direction: this.state.readDirection == 3 ? "rtl" : "ltr" }}
          id="imgBox"
        >
          <div
            className={[
              this.state.readDirection == 1 ? Styles.view1 : Styles.view3,
            ]}
          >
            {this.renderImg(this.state.picNumber)}
          </div>
        </div>
        <div
          className={Styles.readSetting}
          onClick={() => {
            this.setState({ popupVisible: true });
          }}
        >
          <AppstoreOutline fontSize="35" color="blueviolet" />
        </div>
        <Popup
          visible={this.state.popupVisible}
          onMaskClick={() => {
            this.setState({
              popupVisible: false,
            });
          }}
          bodyStyle={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            minHeight: "30vh",
          }}
        >
          <ReadSetting
            data={{ readDirection: this.state.readDirection }}
            change={(params) => {
              this.setState(params);
            }}
          />
        </Popup>
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
